import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';

/** Management of individual HardwareItemSets.
 * @class
 */
export class HardwareItemSetRecord extends VingRecord {
    // add custom Record code here

    /**
     * Extends `describeLinks()` in `VingRecord`.
     * @see VingRecord.describeLinks()
     */
    async describeLinks(idString, restVersion, schema, params = {}) {
        const links = await super.describeLinks(idString, restVersion, schema, params);
        links.view = { href: `/${schema.kind?.toLowerCase()}s/${idString}`, methods: ['GET'], usage: 'page' };
        links.list = { href: `/${schema.kind?.toLowerCase()}s`, methods: ['GET'], usage: 'page' };
        return links;
    }

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