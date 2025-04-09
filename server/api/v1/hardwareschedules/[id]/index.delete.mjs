import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareschedules = await useKind('HardwareSchedule');
    const { id } = getRouterParams(event);
    const hardwareschedule = await hardwareschedules.findOrDie(id);
    const session = obtainSession(event);
    await hardwareschedule.canEdit(session);
    await hardwareschedule.delete();
    return hardwareschedule.describe(describeParams(event, session));
});