import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetasks = await useKind('MaintenanceTask');
    const { id } = getRouterParams(event);
    const maintenancetask = await maintenancetasks.findOrDie(id);
    const session = obtainSession(event);
    await maintenancetask.canEdit(session);
    await maintenancetask.updateAndVerify(await getBody(event), session);
    return maintenancetask.describe(describeParams(event, session));
});