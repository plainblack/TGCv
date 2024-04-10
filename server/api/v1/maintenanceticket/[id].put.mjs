import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    const { id } = getRouterParams(event);
    const maintenanceticket = await maintenancetickets.findOrDie(id);
    const session = obtainSession(event);
    await maintenanceticket.canEdit(session);
    await maintenanceticket.updateAndVerify(await getBody(event), session);
    return maintenanceticket.describe(describeParams(event, session));
});