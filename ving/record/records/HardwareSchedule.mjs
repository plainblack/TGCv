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
        const cronJobId = this.get('cronJobId');
        await super.delete();
        ving.log('Schedule').debug(`Schedule ${myId} has jobId <${cronJobId}>`);
        if (cronJobId) {
            ving.log('Schedule').debug(`Killing jobId <${cronJobId}>`);
            const CronJobs = await useKind("CronJob");
            const myJob = await CronJobs.findOrDie(cronJobId)
            await myJob.delete();
        }
    }

    #skipUpdateJobCreation = false;

    async update() {
        await super.update();
        if (!this.#skipUpdateJobCreation) {
            const myId = this.get('id');
            const cronJobId = this.get('cronJobId');
            if (cronJobId) {
                ving.log('Schedule').debug(`Killing jobId <${cronJobId}>`);
                const CronJobs = await useKind("CronJob");
                const myJob = await CronJobs.findOrDie(cronJobId)
                await myJob.delete();
            }
            this.createJob();
        }
        this.#skipUpdateJobCreation = false;
    }

    /**
     * Extends `describeLinks()` in `VingRecord`.
     * @see VingRecord.describeLinks()
     */
    async describeLinks(idString, restVersion, schema, params = {}) {
        const links = await super.describeLinks(idString, restVersion, schema, params);
        links.edit = { href: `/${schema.kind?.toLowerCase()}s/${idString}/edit`, methods: ['GET'], usage: 'page' };
        links.list = { href: `/${schema.kind?.toLowerCase()}s`, methods: ['GET'], usage: 'page' };
        return links;
    }

    async createTicket() {
        const Tickets = await useKind('HardwareTicket');
        await Tickets.create({
            type: 'routine',
            submittedBy: 'TGC',
            description: this.description,
            hardwareTaskId: this.hardwareTaskId,
            hardwareItemId: this.hardwareItemId,
            priority: this.ticketPriority,
        });
    }

    async createJob() {
        //Hour Minute DayOfMonth Month DayOfWeek
        const CronJobs = await useKind("CronJob");
        const newJob = await CronJobs.create({
            schedule: this.schedule,
            handler: 'CreateTicketFromSchedule',
            params: { id: this.id },
            enabled: true,
            note: "Cron job for Hardware Schedule " + this.id,
        });
        ving.log('Schedule').debug(`Schedule ${this.id} assigned jobId <${newJob.id}>`);
        this.cronJobId = newJob.id;
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
