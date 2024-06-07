import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketfiles = await useKind('HardwareTicketFile');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwareticketfile = await hardwareticketfiles.createAndVerify(await getBody(event), session);
    return hardwareticketfile.describe(describeParams(event, session));
});