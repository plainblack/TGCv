import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual HardwareItems.
 * @class
 */
export class HardwareItemRecord extends VingRecord {
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

/** Management of all HardwareItems.
 * @class
 */
export class HardwareItemKind extends VingKind {
    // add custom Kind code here

}