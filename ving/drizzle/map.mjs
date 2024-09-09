import { APIKeyTable } from "#ving/drizzle/schema/APIKey.mjs";
import { UserTable } from "#ving/drizzle/schema/User.mjs";
import { CronJobTable } from "#ving/drizzle/schema/CronJob.mjs";
import { S3FileTable } from "#ving/drizzle/schema/S3File.mjs";
import { HardwareItemTable } from "#ving/drizzle/schema/HardwareItem.mjs";
import { HardwareItemSetTable } from "#ving/drizzle/schema/HardwareItemSet.mjs";
import { HardwareScheduleTable } from "#ving/drizzle/schema/HardwareSchedule.mjs";
import { HardwareTaskTable } from "#ving/drizzle/schema/HardwareTask.mjs";
import { HardwareTicketTable } from "#ving/drizzle/schema/HardwareTicket.mjs";
import { HardwareTicketFileTable } from "#ving/drizzle/schema/HardwareTicketFile.mjs";
import { HardwareTicketRemarkTable } from "#ving/drizzle/schema/HardwareTicketRemark.mjs";


export const tableModules = {
    User: UserTable,
    APIKey: APIKeyTable,
    CronJob: CronJobTable,
    S3File: S3FileTable,
    HardwareItem: HardwareItemTable,
    HardwareItemSet: HardwareItemSetTable,
    HardwareSchedule: HardwareScheduleTable,
    HardwareTask: HardwareTaskTable,
    HardwareTicket: HardwareTicketTable,
    HardwareTicketFile: HardwareTicketFileTable,
    HardwareTicketRemark: HardwareTicketRemarkTable,
};
