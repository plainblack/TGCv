import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitemsets = await useKind('HardwareItemSet');
    return await hardwareitemsets.describeList(describeListParams(event), describeListWhere(event, hardwareitemsets.describeListFilter()));
});