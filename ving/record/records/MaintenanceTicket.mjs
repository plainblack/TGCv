import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

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
            out.meta.fullName = '#' + this.projectNumber + ' ' + this.name;
        }
        return out;
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