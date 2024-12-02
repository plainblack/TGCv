import ving from '#ving/index.mjs';
import { useKind } from '#ving/record/utils.mjs';

/**
 * This handler creates a ticket from a schedule based on its cron schedule.
 * @param {Object} A `BullMQ` job.
 * @returns {boolean} `true`
 */
export default async function (job) {
    ving.log('jobs').info(`Creating ticket for schedule ${job.data.id}`);
    const Schedules = await useKind('HardwareSchedule');
    const schedule = await Schedules.find(job.data.id);
    if (!schedule) {
        ving.log('jobs').warn(`Could not find Schedule with id ${job.data.id}`);
        return true;
    }
    await schedule.createTicket();
    return true;
}
