import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual HardwareTasks.
 * @class
 */
export class HardwareTaskRecord extends VingRecord {
    // add custom Record code here
    async delete() {
        const set = await this.parent('itemSet');
        await super.delete();
        await set.countTasks();
    }
    async insert() {
        await super.insert();
        const set = await this.parent('itemSet');
        await set.countTasks();
    }
}

/** Management of all HardwareTasks.
 * @class
 */
export class HardwareTaskKind extends VingKind {
    // add custom Kind code here

}