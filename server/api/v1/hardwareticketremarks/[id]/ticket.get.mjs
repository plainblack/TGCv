import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketremarks = await useKind('HardwareTicketRemark');
    const { id } = getRouterParams(event);
    const hardwareticketremark = await hardwareticketremarks.findOrDie(id);
    const ticket = await hardwareticketremark.parent('ticket');
    return await ticket.describe(describeParams(event));
});