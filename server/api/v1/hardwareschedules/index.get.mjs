import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareschedules = await useKind('HardwareSchedule');
    return await hardwareschedules.describeList(describeListParams(event), describeListWhere(event, hardwareschedules.describeListFilter()));
});