import { isUndefined } from '#ving/utils/identify.mjs';
import { ouch } from '#ving/utils/ouch.mjs';
import { userSchema } from "#ving/schema/schemas/User.mjs";
import { apikeySchema } from "#ving/schema/schemas/APIKey.mjs";
import { hardwareTicketRemarkSchema } from "#ving/schema/schemas/HardwareTicketRemark.mjs";
import { hardwareTicketFileSchema } from "#ving/schema/schemas/HardwareTicketFile.mjs";
import { hardwareTicketSchema } from "#ving/schema/schemas/HardwareTicket.mjs";
import { hardwareScheduleSchema } from "#ving/schema/schemas/HardwareSchedule.mjs";
import { hardwareItemSchema } from "#ving/schema/schemas/HardwareItem.mjs";
import { hardwareItemSetSchema } from "#ving/schema/schemas/HardwareItemSet.mjs";
import { hardwareTaskSchema } from "#ving/schema/schemas/HardwareTask.mjs";
import { cronJobSchema } from "#ving/schema/schemas/CronJob.mjs";
import { s3fileSchema } from "#ving/schema/schemas/S3File.mjs";

/**
 * An array of all the Ving Schemas
 */
export const vingSchemas = [
    userSchema,
    apikeySchema,
    hardwareTicketRemarkSchema,
    hardwareTicketFileSchema,
    hardwareTicketSchema,
    hardwareScheduleSchema,
    hardwareItemSchema,
    hardwareItemSetSchema,
    hardwareTaskSchema,
    cronJobSchema,
    s3fileSchema,
];

/**
 * Get the schema for a specific kind within the ving schema list.
 * 
 * @param {string} nameToFind The table name or kind name to find.
 * @param {string} by Can be `kind` or `tableName`. Defaults to `tableName`.
 * @throws 404 if schema not found
 * @returns {VingSchema} A ving kind schema.
 * @example
 * const schema = findVingSchema('users')
 */
export const findVingSchema = (nameToFind = '-unknown-', by = 'tableName') => {
    try {
        const found = vingSchemas.find(obj => obj[by] == nameToFind);
        if (isUndefined(found))
            throw ouch(404, `cannot find ${nameToFind} by ${by} in vingSchemas`);
        return found;
    }
    catch {
        throw ouch(404, 'ving schema ' + nameToFind + ' not found');
    }
}
