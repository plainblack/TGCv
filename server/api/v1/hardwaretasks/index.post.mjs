import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwaretask = await hardwaretasks.createAndVerify(await getBody(event), session);
    return hardwaretask.describe(describeParams(event, session));
});