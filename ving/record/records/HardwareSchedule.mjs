import { VingRecord, VingKind, } from "#ving/record/VingRecord.mjs";
import { useKind } from '#ving/record/utils.mjs';
import ving from '#ving/index.mjs';
import { addJob, killJob } from '#ving/jobs/queue.mjs';

/** Management of individual HardwareSchedules.
 * @class
 */
export class HardwareScheduleRecord extends VingRecord {
    async insert() {
        await super.insert();
        await this.createJob();
    }

    async delete() {
        const myId = this.get('id');
        const jobId = this.get('jobsId');
        await super.delete();
        ving.log('Schedule').debug(`Schedule ${myId} has jobId <${jobId}>`);
        if (jobId) {
            ving.log('Schedule').debug(`Killing jobId <${jobId}>`);
            const result = await killJob(jobId);
            if (!result) {
                ving.log('HardwareSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
            }
        }
    }

    #skipUpdateJobCreation = false;

    async update() {
        ving.log('Schedule').debug(`Schedule ${this.id} before SUPER update`);
        await super.update();
        ving.log('Schedule').debug(`Schedule ${this.id} after SUPER update`);
        if (!this.#skipUpdateJobCreation) {
            const myId = this.get('id');
            const jobsId = this.get('jobsId');
            if (jobsId) {
                const result = await killJob(jobsId);
                if (!result) {
                    ving.log('HardwareSchedule').error(`Could not close job ${jobsId} for schedule ${myId}`);
                }
            }
            this.createJob();
        }
        this.#skipUpdateJobCreation = false;
    }

    async createTicket() {
        const Tickets = await useKind('HardwareTicket');
        await Tickets.create({
            type: 'routine',
            submittedBy: 'TGC',
            description: this.description,
            maintenanceTaskId: this.maintenanceTaskId,
            maintenanceItemId: this.maintenanceItemId,
        });
    }

    async createJob() {
        //Hour Minute DayOfMonth Month DayOfWeek
        let cronSpec = '1 10 ';
        let dayOfMonth = 0;
        if (this.weeks >= 1) {
            dayOfMonth += (this.weeks * 7 + this.days)
        }
        else {
            if (this.days > 0) {
                dayOfMonth += this.days;
            }
            else {
                dayOfMonth = 1;
            }
        }
        if (this.recurrence == 'daily') {
            cronSpec += '* * *';
        }
        else if (this.recurrence == 'weekly') {
            cronSpec += '* * ' + this.days;
        }
        else if (this.recurrence == 'monthly') {
            cronSpec += dayOfMonth + ' * *';
        }
        else if (this.recurrence == 'yearly') {
            let monthOfYear = 1;
            if (this.months > 0) {
                monthOfYear = this.months;
            }
            cronSpec += `${dayOfMonth} ${monthOfYear} *`;
        }
        const newJob = await addJob('CreateTicketFromSchedule', { id: this.id }, { cron: cronSpec });
        ving.log('Schedule').debug(`Schedule ${this.id} assigned jobId <${newJob.id}>`);
        this.jobsId = newJob.id;
        this.#skipUpdateJobCreation = true;
        await this.update();
    }

}

/** Management of all HardwareSchedules.
 * @class
 */
export class HardwareScheduleKind extends VingKind {
    // add custom Kind code here

}
