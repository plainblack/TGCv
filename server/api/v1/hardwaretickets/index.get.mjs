import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    return await hardwaretickets.describeList(describeListParams(event), describeListWhere(event, hardwaretickets.describeListFilter()));
});