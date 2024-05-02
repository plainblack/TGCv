import { VingRecord, VingKind, } from "#ving/record/VingRecord.mjs";
import { useKind } from '#ving/record/utils.mjs';
import ving from '#ving/index.mjs';

/** Management of individual MaintenanceSchedules.
 * @class
 */
export class MaintenanceScheduleRecord extends VingRecord {
    async insert() {
        await super.insert();
        await this.createJob();
    }

    async delete() {
        const myId = this.get('id');
        const jobId = this.get('jobsId');
        await super.delete();
        if (jobId) {
            const result = await ving.killJob(jobId);
            if (!result) {
                ving.log('MaintenanceSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
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
                const result = await ving.killJob(jobId);
                if (!result) {
                    ving.log('MaintenanceSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
                }
            }
            this.createJob();
        }
        this.#skipUpdateJobCreation = false;
    }

    async createTicket() {
        const Tickets = await useKind('MaintenanceTicket');
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
        const newJob = await ving.addJob('CreateTicketFromSchedule', { id: this.id }, { cron: cronSpec });
        this.jobId = newJob.id;
        this.#skipUpdateJobCreation = true;
        this.update();
    }

}

/** Management of all MaintenanceSchedules.
 * @class
 */
export class MaintenanceScheduleKind extends VingKind {
    // add custom Kind code here

}
