import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwareticket = await hardwaretickets.createAndVerify(await getBody(event), session);
    return hardwareticket.describe(describeParams(event, session));
});