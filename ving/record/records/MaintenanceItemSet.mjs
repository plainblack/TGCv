import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual MaintenanceItemSets.
 * @class
 */
export class MaintenanceItemSetRecord extends VingRecord {
    // add custom Record code here

    /**
         * Extends `delete()` in `VingRecord` to delete the associated `MaintenanceTask` and `MaintenanceItem`.
         * 
         * @see VingRecord.delete()
         */
    async delete() {

        await this.tasks.deleteMany();

        await this.items.deleteMany();

    }

}

/** Management of all MaintenanceItemSets.
 * @class
 */
export class MaintenanceItemSetKind extends VingKind {
    // add custom Kind code here

}