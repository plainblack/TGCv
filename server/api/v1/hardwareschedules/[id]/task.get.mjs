import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareschedules = await useKind('HardwareSchedule');
    const { id } = getRouterParams(event);
    const hardwareschedule = await hardwareschedules.findOrDie(id);
    const task = await hardwareschedule.parent('task');
    return await task.describe(describeParams(event));
});