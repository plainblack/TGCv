import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceremarks = await useKind('MaintenanceRemark');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenanceremark = await maintenanceremarks.createAndVerify(await getBody(event), session);
    return maintenanceremark.describe(describeParams(event, session));
});