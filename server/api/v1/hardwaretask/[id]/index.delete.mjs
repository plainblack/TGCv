import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    const { id } = getRouterParams(event);
    const hardwaretask = await hardwaretasks.findOrDie(id);
    const session = obtainSession(event);
    await hardwaretask.canEdit(session);
    await hardwaretask.delete();
    return hardwaretask.describe(describeParams(event, session));
});