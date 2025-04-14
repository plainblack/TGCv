import { useKind } from '#ving/record/utils.mjs';
import { defineEventHandler, getQuery } from 'h3';
import { eq } from '#ving/drizzle/orm.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    const query = getQuery(event);
    const ticket = await hardwaretickets.findOne(eq(hardwaretickets.table.id, query.ticketNumber));
    return await ticket.describe(describeParams(event));
});