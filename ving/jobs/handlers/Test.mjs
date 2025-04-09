import ving from '#ving/index.mjs';

/**
 * This handler does nothing other that write to the log with whatever data was passed in. 
 * @param {Object} job A `BullMQ` job.
 * @param {Object} job.data An object with data needed for this job.
 * @param {string} job.data.error If this exists the handler will throw that message in an Error object.
 * @returns {boolean} `true`
 */
export default async function (job) {
    ving.log('jobs').debug(`Test ran with data: ${JSON.stringify(job.data)} which is a ${typeof job.data}`);
    if (job.data.error) {
        throw new Error(job.data.error);
    }
    return true;
}