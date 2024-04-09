import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual MaintenanceItemSets.
 * @class
 */
export class MaintenanceItemSetRecord extends VingRecord {
    // add custom Record code here

    async countItems() {
        const items = await this.children('items');
        this.itemCount = await items.count();
        await this.update();
    }

    async countTasks() {
        const tasks = await this.children('tasks');
        this.taskCount = await tasks.count();
        await this.update();
    }

    /**
         * Extends `delete()` in `VingRecord` to delete the associated `MaintenanceTask` and `MaintenanceItem`.
         * 
         * @see VingRecord.delete()
         */
    async delete() {

        await (await this.children('tasks')).deleteMany();

        await (await this.children('items')).deleteMany();

        await super.delete();

    }

}

/** Management of all MaintenanceItemSets.
 * @class
 */
export class MaintenanceItemSetKind extends VingKind {
    // add custom Kind code here

}