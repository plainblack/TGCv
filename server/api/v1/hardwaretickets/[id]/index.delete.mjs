import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    const { id } = getRouterParams(event);
    const hardwareticket = await hardwaretickets.findOrDie(id);
    const session = obtainSession(event);
    await hardwareticket.canEdit(session);
    await hardwareticket.delete();
    return hardwareticket.describe(describeParams(event, session));
});