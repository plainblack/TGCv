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
        await super.update();
        if (!this.#skipUpdateJobCreation) {
            const myId = this.get('id');
            const jobId = this.get('jobsId');
            if (jobId) {
                const result = await killJob(jobId);
                if (!result) {
                    ving.log('HardwareSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
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
            dayOfMonth += this.days;
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
            cronSpec += `${dayOfMonth} ${this.months} *`;
        }
        const newJob = await addJob('CreateTicketFromSchedule', { id: this.id }, { cron: cronSpec });
        ving.log('Schedule').debug(`Schedule ${this.id} assigned jobId <${newJob.id}>`);
        this.jobsId = newJob.id;
        this.#skipUpdateJobCreation = true;
        this.update();
    }

}

/** Management of all HardwareSchedules.
 * @class
 */
export class HardwareScheduleKind extends VingKind {
    // add custom Kind code here

}