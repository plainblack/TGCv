import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    return hardwaretasks.mint().propOptions(describeParams(event), true);
});