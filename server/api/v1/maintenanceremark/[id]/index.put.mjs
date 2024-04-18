import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceremarks = await useKind('MaintenanceRemark');
    const { id } = getRouterParams(event);
    const maintenanceremark = await maintenanceremarks.findOrDie(id);
    const session = obtainSession(event);
    await maintenanceremark.canEdit(session);
    await maintenanceremark.updateAndVerify(await getBody(event), session);
    return maintenanceremark.describe(describeParams(event, session));
});