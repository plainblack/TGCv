import ving from '#ving/index.mjs';
import { useKind } from '#ving/record/VingKind.mjs';

/**
 * This handler deletes a S3File if it does not achieve a ready state by the time this job runs. 
 * @param {Object} A `BullMQ` job.
 * @returns {boolean} `true`
 */
export default async function (job) {
    ving.log('jobs').info(`Creating ticket for schedule ${job.data.id}`);
    const Schedules = await useKind('MaintenanceSchedule');
    const schedule = await Schedules.find(jobs.data.id);
    if (!schedule) {
        ving.log('jobs').warn(`Could not find Schedule with id ${job.data.id}`);
        return true;
    }
    await schedule.createTicket();
    return true;
}