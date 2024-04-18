import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';
import ving from '#ving/index.mjs';

/** Management of individual MaintenanceRemarks.
 * @class
 */
export class MaintenanceRemarkRecord extends VingRecord {
    // add custom Record code here
    async insert() {
        await super.insert();
        const ticket = await this.parent('ticket');
        await ticket.sumResolutionMinutes();
    }

    async delete() {
        const ticket = await this.parent('ticket');
        await super.delete();
        await ticket.sumResolutionMinutes();
    }
}

/** Management of all MaintenanceRemarks.
 * @class
 */
export class MaintenanceRemarkKind extends VingKind {
    // add custom Kind code here
}