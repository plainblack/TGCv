import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitemsets = await useKind('HardwareItemSet');
    const { id } = getRouterParams(event);
    const hardwareitemset = await hardwareitemsets.findOrDie(id);
    return hardwareitemset.describe(describeParams(event));
});