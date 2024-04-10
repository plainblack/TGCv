import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const maintenanceticket = await maintenancetickets.createAndVerify(await getBody(event), session);
    return maintenanceticket.describe(describeParams(event, session));
});