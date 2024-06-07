import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    const { id } = getRouterParams(event);
    const hardwaretask = await hardwaretasks.findOrDie(id);
    return hardwaretask.describe(describeParams(event));
});