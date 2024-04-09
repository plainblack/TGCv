import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitems = await useKind('MaintenanceItem');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenanceitem = await maintenanceitems.createAndVerify(await getBody(event), session);
    return maintenanceitem.describe(describeParams(event, session));
});