import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceremarks = await useKind('MaintenanceRemark');
    const { id } = getRouterParams(event);
    const maintenanceremark = await maintenanceremarks.findOrDie(id);
    const session = obtainSession(event);
    await maintenanceremark.canEdit(session);
    await maintenanceremark.delete();
    return maintenanceremark.describe(describeParams(event, session));
});