import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketremarks = await useKind('HardwareTicketRemark');
    return hardwareticketremarks.mint().propOptions(describeParams(event), true);
});