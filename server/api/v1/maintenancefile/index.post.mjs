import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancefiles = await useKind('MaintenanceFile');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenancefile = await maintenancefiles.createAndVerify(await getBody(event), session);
    return maintenancefile.describe(describeParams(event, session));
});