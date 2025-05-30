import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { sum } from '#ving/drizzle/orm.mjs';
import ving from '#ving/index.mjs';
import { WebClient } from '@slack/web-api';
import { stringifyId } from '#ving/utils/int2str.mjs';


/** Management of individual HardwareTickets.
 * @class
 */
export class HardwareTicketRecord extends VingRecord {
    // add custom Record code here

    /**
     * Extends `describe()` in `VingRecord` to add `meta` property `fullName` which is project number + name
     * 
     * @see VingRecord.describe()
     */
    async describe(params = {}) {
        const out = await super.describe(params);
        if (params?.include?.meta && out.meta) {
            out.meta.ticketNumber = this.id;
        }
        return out;
    }
    /**
     * Extends `describeLinks()` in `VingRecord`.
     * @see VingRecord.describeLinks()
     */
    async describeLinks(idString, restVersion, schema, params = {}) {
        const links = await super.describeLinks(idString, restVersion, schema, params);
        links.edit = { href: `/${schema.kind?.toLowerCase()}s/${idString}/edit`, methods: ['GET'], usage: 'page' };
        links.view = { href: `/${schema.kind?.toLowerCase()}s/${idString}`, methods: ['GET'], usage: 'page' };
        links.list = { href: `/${schema.kind?.toLowerCase()}s`, methods: ['GET'], usage: 'page' };
        return links;
    }

    async insert() {
        await super.insert();
        await this.refresh(); //Needed to get the projectNumber from the db.
        if (this.get('type') == 'needs_help') {
            this.sendSlackPing();
        }
    };

    /**
     * Count the number of minutes in all `HardwareTicketRemark`s.
     * 
     */
    async sumResolutionMinutes() {
        const remarks = await this.children('remarks');
        this.resolutionMinutes = await remarks.sum('resolutionMinutes');
        this.update();
    }

    /**
         * Extends `delete()` in `VingRecord` to delete the associated `HardwareTicketRemark` and `HardwareTicketFile`.
         * 
         * @see VingRecord.delete()
         */
    async delete() {

        await (await this.children('remarks')).deleteMany();

        await (await this.children('files')).deleteMany();

        await super.delete();
    }

    skipSlackPing = false;

    async sendSlackPing() {
        //do a bunch of slack stuff
        if (this.skipSlackPing) {
            return;
        }
        const token = process.env.SLACK_TOKEN;
        const channelId = process.env.SLACK_CHANNELID;
        const sitename = process.env.VING_SITE_URL;
        const web = new WebClient(token);
        const stringyId = stringifyId(this.id);
        const item = await this.parent('item');
        const result = await web.chat.postMessage({
            text: `Added ticket ID: ${this.id} ${item.name} ${sitename}/hardwaretickets/${stringyId}`,
            channel: channelId,
        });
    }

}

/** Management of all HardwareTickets.
 * @class
 */
export class HardwareTicketKind extends VingKind {
    // add custom Kind code here
}