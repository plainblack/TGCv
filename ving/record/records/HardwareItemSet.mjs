import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual HardwareItemSets.
 * @class
 */
export class HardwareItemSetRecord extends VingRecord {
    // add custom Record code here

    async countItems() {
        const items = await this.children('items');
        this.itemCount = await items.count();
        await this.update();
    }

    async countTasks() {
        const tasks = await this.children('tasks');
        console.log("task count: " + this.taskCount);
        this.taskCount = await tasks.count();
        console.log("NEW task count: " + this.taskCount);

        await this.update();
    }

    /**
         * Extends `delete()` in `VingRecord` to delete the associated `HardwareTask` and `HardwareItem`.
         * 
         * @see VingRecord.delete()
         */
    async delete() {

        await (await this.children('tasks')).deleteMany();

        await (await this.children('items')).deleteMany();

        await super.delete();

    }

}

/** Management of all HardwareItemSets.
 * @class
 */
export class HardwareItemSetKind extends VingKind {
    // add custom Kind code here

}