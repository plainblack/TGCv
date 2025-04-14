import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketremarks = await useKind('HardwareTicketRemark');
    return await hardwareticketremarks.describeList(describeListParams(event), describeListWhere(event, hardwareticketremarks.describeListFilter()));
});