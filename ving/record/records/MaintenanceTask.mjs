import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual MaintenanceTasks.
 * @class
 */
export class MaintenanceTaskRecord extends VingRecord {
    // add custom Record code here
    async delete() {
        const set = await this.parent('itemSet');
        await super.delete();
        await set.countItems();
    }
    async insert() {
        await super.insert();
        const set = await this.parent('itemSet');
        await set.countItems();
    }
}

/** Management of all MaintenanceTasks.
 * @class
 */
export class MaintenanceTaskKind extends VingKind {
    // add custom Kind code here

}