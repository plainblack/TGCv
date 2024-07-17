import Test from "#ving/jobs/handlers/Test.mjs";
import DeleteUnusedS3File from "#ving/jobs/handlers/DeleteUnusedS3File.mjs";
import CronJob from "#ving/jobs/handlers/CronJob.mjs";
import CreateTicketFromSchedule from '#ving/jobs/handlers/CreateTicketFromSchedule.mjs';

export const jobHandlers = {
    Test,
    DeleteUnusedS3File,
    CronJob,
    CreateTicketFromSchedule,
}
