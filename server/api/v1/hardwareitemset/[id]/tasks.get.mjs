import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitemsets = await useKind('HardwareItemSet');
    const { id } = getRouterParams(event);
    const hardwareitemset = await hardwareitemsets.findOrDie(id);
    const hardwaretasks = await hardwareitemset.children('tasks');
    return await hardwaretasks.describeList(describeListParams(event), describeListWhere(event, hardwaretasks.describeListFilter()));
});