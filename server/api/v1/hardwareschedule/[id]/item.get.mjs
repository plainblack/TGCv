import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareschedules = await useKind('HardwareSchedule');
    const { id } = getRouterParams(event);
    const hardwareschedule = await hardwareschedules.findOrDie(id);
    const item = await hardwareschedule.parent('item');
    return await item.describe(describeParams(event));
});