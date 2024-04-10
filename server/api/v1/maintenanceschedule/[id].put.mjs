import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceschedules = await useKind('MaintenanceSchedule');
    const { id } = getRouterParams(event);
    const maintenanceschedule = await maintenanceschedules.findOrDie(id);
    const session = obtainSession(event);
    await maintenanceschedule.canEdit(session);
    await maintenanceschedule.updateAndVerify(await getBody(event), session);
    return maintenanceschedule.describe(describeParams(event, session));
});