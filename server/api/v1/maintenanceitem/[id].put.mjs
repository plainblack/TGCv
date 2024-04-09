import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitems = await useKind('MaintenanceItem');
    const { id } = getRouterParams(event);
    const maintenanceitem = await maintenanceitems.findOrDie(id);
    const session = obtainSession(event);
    await maintenanceitem.canEdit(session);
    await maintenanceitem.updateAndVerify(await getBody(event), session);
    return maintenanceitem.describe(describeParams(event, session));
});