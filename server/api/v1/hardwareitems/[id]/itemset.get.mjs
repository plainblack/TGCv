import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitems = await useKind('HardwareItem');
    const { id } = getRouterParams(event);
    const hardwareitem = await hardwareitems.findOrDie(id);
    const itemset = await hardwareitem.parent('itemset');
    return await itemset.describe(describeParams(event));
});