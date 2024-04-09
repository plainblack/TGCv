import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitemsets = await useKind('MaintenanceItemSet');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenanceitemset = await maintenanceitemsets.createAndVerify(await getBody(event), session);
    return maintenanceitemset.describe(describeParams(event, session));
});