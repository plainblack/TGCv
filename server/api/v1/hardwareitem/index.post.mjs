import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitems = await useKind('HardwareItem');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwareitem = await hardwareitems.createAndVerify(await getBody(event), session);
    return hardwareitem.describe(describeParams(event, session));
});