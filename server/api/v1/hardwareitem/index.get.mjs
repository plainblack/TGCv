import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitems = await useKind('HardwareItem');
    return await hardwareitems.describeList(describeListParams(event), describeListWhere(event, hardwareitems.describeListFilter()));
});