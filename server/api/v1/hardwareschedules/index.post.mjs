import { useKind } from '#ving/record/utils.mjs';
import { describeParams, getBody, obtainSessionIfRole } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareschedules = await useKind('HardwareSchedule');
    const session = obtainSessionIfRole(event, 'verifiedEmail');
    const hardwareschedule = await hardwareschedules.createAndVerify(await getBody(event), session);
    return hardwareschedule.describe(describeParams(event, session));
});