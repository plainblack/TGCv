import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretasks = await useKind('HardwareTask');
    return await hardwaretasks.describeList(describeListParams(event), describeListWhere(event, hardwaretasks.describeListFilter()));
});