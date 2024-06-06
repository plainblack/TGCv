import { VingRecord, VingKind } from "#ving/record/VingRecord.mjs";
import { eq } from '#ving/drizzle/orm.mjs';
import ving from '#ving/index.mjs';

/** Management of individual HardwareTicketRemarks.
 * @class
 */
export class HardwareTicketRemarkRecord extends VingRecord {
    // add custom Record code here
    async insert() {
        await super.insert();
        await this.updateTicket();
    }

    async delete() {
        const ticket = await this.parent('ticket');
        await super.delete();
        await ticket.sumResolutionMinutes();
    }

    async update() {
        await super.update();
        await this.updateTicket();
    }

    #markParentResolved = false;

    set(key, value) {
        const out = super.set(key, value);
        if (key == 'resolution' && value == 'resolved') {
            console.log("Update parent ticket");
            this.#markParentResolved = true;
        }
        return out;
    }

    async updateTicket() {
        const ticket = await this.parent('ticket');
        if (this.#markParentResolved) {
            ticket.status = 'resolved';
            console.log("Ticket id: " + ticket.get('id'));
            await ticket.update();
            this.#markParentResolved = false;
        }
        await ticket.sumResolutionMinutes();
    };

}

/** Management of all HardwareTicketRemarks.
 * @class
 */
export class HardwareTicketRemarkKind extends VingKind {
    // add custom Kind code here
}