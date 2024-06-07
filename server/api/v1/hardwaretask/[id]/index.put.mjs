import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    const { id } = getRouterParams(event);
    const hardwaretask = await hardwaretasks.findOrDie(id);
    const session = obtainSession(event);
    await hardwaretask.canEdit(session);
    await hardwaretask.updateAndVerify(await getBody(event), session);
    return hardwaretask.describe(describeParams(event, session));
});