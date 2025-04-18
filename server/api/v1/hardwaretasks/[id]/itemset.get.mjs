import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    const { id } = getRouterParams(event);
    const hardwaretask = await hardwaretasks.findOrDie(id);
    const itemset = await hardwaretask.parent('itemset');
    return await itemset.describe(describeParams(event));
});