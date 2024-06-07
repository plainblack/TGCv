import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketremarks = await useKind('HardwareTicketRemark');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwareticketremark = await hardwareticketremarks.createAndVerify(await getBody(event), session);
    return hardwareticketremark.describe(describeParams(event, session));
});