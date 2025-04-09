import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    const { id } = getRouterParams(event);
    const hardwareticket = await hardwaretickets.findOrDie(id);
    const hardwareticketremarks = await hardwareticket.children('remarks');
    return await hardwareticketremarks.describeList(describeListParams(event), describeListWhere(event, hardwareticketremarks.describeListFilter()));
});