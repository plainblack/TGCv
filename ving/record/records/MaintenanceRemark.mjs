import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';
import ving from '#ving/index.mjs';

/** Management of individual MaintenanceRemarks.
 * @class
 */
export class MaintenanceRemarkRecord extends VingRecord {
    // add custom Record code here
    async insert() {
        await super.insert();
        const ticket = await this.parent('ticket');
        await ticket.sumResolutionMinutes();
    }

    async delete() {
        const ticket = await this.parent('ticket');
        await super.delete();
        await ticket.sumResolutionMinutes();
    }

    async set(key, value) {
        const out = super.set(key, value);
        if (key == 'resolution' && value == 'resolved') {
            console.log("Update parent ticket");
            const ticket = await this.parent('ticket');
            ticket.status = 'resolved';
            console.log("Ticket id: " + ticket.get('id'));
            await ticket.update();
        }
        return out;
    }
}

/** Management of all MaintenanceRemarks.
 * @class
 */
export class MaintenanceRemarkKind extends VingKind {
    // add custom Kind code here
}