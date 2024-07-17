import { APIKeyRecord, APIKeyKind } from "#ving/record/records/APIKey.mjs";
import { UserRecord, UserKind } from "#ving/record/records/User.mjs";
import { CronJobRecord, CronJobKind } from "#ving/record/records/CronJob.mjs";
import { S3FileRecord, S3FileKind } from "#ving/record/records/S3File.mjs";
import { HardwareItemRecord, HardwareItemKind } from "#ving/record/records/HardwareItem.mjs";
import { HardwareItemSetRecord, HardwareItemSetKind } from "#ving/record/records/HardwareItemSet.mjs";
import { HardwareScheduleRecord, HardwareScheduleKind } from "#ving/record/records/HardwareSchedule.mjs";
import { HardwareTaskRecord, HardwareTaskKind } from "#ving/record/records/HardwareTask.mjs";
import { HardwareTicketRecord, HardwareTicketKind } from "#ving/record/records/HardwareTicket.mjs";
import { HardwareTicketFileRecord, HardwareTicketFileKind } from "#ving/record/records/HardwareTicketFile.mjs";
import { HardwareTicketRemarkRecord, HardwareTicketRemarkKind } from "#ving/record/records/HardwareTicketRemark.mjs";

export const recordModules = {
    User: UserRecord,
    APIKey: APIKeyRecord,
    CronJob: CronJobRecord,
    S3File: S3FileRecord,
    HardwareItem: HardwareItemRecord,
    HardwareItemSet: HardwareItemSetRecord,
    HardwareSchedule: HardwareScheduleRecord,
    HardwareTask: HardwareTaskRecord,
    HardwareTicket: HardwareTicketRecord,
    HardwareTicketFile: HardwareTicketFileRecord,
    HardwareTicketRemark: HardwareTicketRemarkRecord,
};

export const kindModules = {
    User: UserKind,
    APIKey: APIKeyKind,
    CronJob: CronJobKind,
    S3File: S3FileKind,
    HardwareItem: HardwareItemKind,
    HardwareItemSet: HardwareItemSetKind,
    HardwareSchedule: HardwareScheduleKind,
    HardwareTask: HardwareTaskKind,
    HardwareTicket: HardwareTicketKind,
    HardwareTicketFile: HardwareTicketFileKind,
    HardwareTicketRemark: HardwareTicketRemarkKind,
};
