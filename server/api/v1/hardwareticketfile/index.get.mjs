import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketfiles = await useKind('HardwareTicketFile');
    return await hardwareticketfiles.describeList(describeListParams(event), describeListWhere(event, hardwareticketfiles.describeListFilter()));
});