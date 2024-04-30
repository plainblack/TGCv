import { VingRecord, VingKind, } from "#ving/record/VingRecord.mjs";
import { useKind } from '#ving/record/VingKind.mjs';
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
        const result = await ving.killJob(jobId);
        if (!result) {
            ving.log('MaintenanceSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
        }
    }

    async update() {
        await super.update();
        const myId = this.get('id');
        const jobId = this.get('jobsId');
        const result = await ving.killJob(jobId);
        if (!result) {
            ving.log('MaintenanceSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
        }
        else {
            this.createJob();
        }
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
        await ving.addJob('CreateTicketFromSchedule', { id: this.id }, { cron: cronSpec });
    }

}

/** Management of all MaintenanceSchedules.
 * @class
 */
export class MaintenanceScheduleKind extends VingKind {
    // add custom Kind code here

}