import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceschedules = await useKind('MaintenanceSchedule');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenanceschedule = await maintenanceschedules.createAndVerify(await getBody(event), session);
    return maintenanceschedule.describe(describeParams(event, session));
});