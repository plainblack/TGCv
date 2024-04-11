import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitems = await useKind('MaintenanceItem');
    const { id } = getRouterParams(event);
    const maintenanceitem = await maintenanceitems.findOrDie(id);
    const session = obtainSession(event);
    await maintenanceitem.canEdit(session);
    await maintenanceitem.delete();
    return maintenanceitem.describe(describeParams(event, session));
});