import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancefiles = await useKind('MaintenanceFile');
    const { id } = getRouterParams(event);
    const maintenancefile = await maintenancefiles.findOrDie(id);
    const session = obtainSession(event);
    await maintenancefile.canEdit(session);
    await maintenancefile.updateAndVerify(await getBody(event), session);
    return maintenancefile.describe(describeParams(event, session));
});