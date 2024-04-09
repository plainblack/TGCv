import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetasks = await useKind('MaintenanceTask');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenancetask = await maintenancetasks.createAndVerify(await getBody(event), session);
    return maintenancetask.describe(describeParams(event, session));
});