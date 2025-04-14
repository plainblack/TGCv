import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitemsets = await useKind('HardwareItemSet');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwareitemset = await hardwareitemsets.createAndVerify(await getBody(event), session);
    return hardwareitemset.describe(describeParams(event, session));
});