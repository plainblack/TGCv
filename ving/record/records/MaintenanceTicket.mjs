import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { sum } from '#ving/drizzle/orm.mjs';
import ving from '#ving/index.mjs';

/** Management of individual MaintenanceTickets.
 * @class
 */
export class MaintenanceTicketRecord extends VingRecord {
    // add custom Record code here

    /**
     * Extends `describe()` in `VingRecord` to add `meta` property `fullName` which is project number + name
     * 
     * @see VingRecord.describe()
     */
    async describe(params = {}) {
        const out = await super.describe(params);
        if (params?.include?.meta && out.meta) {
        }
        return out;
    }

    async insert() {
        await super.insert();
        await this.refresh(); //Needed to get the projectNumber from the db.
    };
    /**
         * Count the number of minutes in all `MaintenanceRemark`s.
         * 
         */
    async sumResolutionMinutes() {
        const remarks = await this.children('remarks');
        this.resolutionMinutes = await remarks.sum('resolutionMinutes');
        this.update();
    }

    /**
         * Extends `delete()` in `VingRecord` to delete the associated `MaintenanceRemark` and `MaintenanceFile`.
         * 
         * @see VingRecord.delete()
         */
    async delete() {

        await (await this.children('remarks')).deleteMany();

        await (await this.children('files')).deleteMany();

        await super.delete();
    }

}

/** Management of all MaintenanceTickets.
 * @class
 */
export class MaintenanceTicketKind extends VingKind {
    // add custom Kind code here
}