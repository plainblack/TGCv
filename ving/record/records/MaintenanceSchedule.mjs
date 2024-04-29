import { VingRecord, VingKind, } from "#ving/record/VingRecord.mjs";
import { useKind } from '#ving/record/VingKind.mjs';
import { killJob, addJob } from '#ving/jobs/queue.mjs';

/** Management of individual MaintenanceSchedules.
 * @class
 */
export class MaintenanceScheduleRecord extends VingRecord {
    // add custom Record code here
    async insert() {
        await super.insert();
        await addJob()
        await this.updateJob();
    }

    async delete() {
        const myId = this.get('id');
        const jobId = this.get('jobsId');
        await super.delete();
        const result = await killJob(jobId);
        if (!result) {
            ving.log('MaintenanceSchedule').error(`Could not close job ${jobId} for schedule ${myId}`);
        }
    }

    async update() {
        await super.update();
        await this.updateJob();
    }

    async createTicket() {
        const Tickets = await useKind('MaintenanceTicket');
        const ticket = Tickets.mint({});
        ticket.set('type') = 'routine';
        ticket.set('submittedBy') = 'TGC';
        ticket.set('description') = schedule.get('description');
        ticket.set('maintenanceTaskId') = schedule.get('maintenanceTaskId');
        ticket.set('maintenanceItemId') = schedule.get('maintenanceItemId');
        ticket.insert();
    }

}

/** Management of all MaintenanceSchedules.
 * @class
 */
export class MaintenanceScheduleKind extends VingKind {
    // add custom Kind code here

}