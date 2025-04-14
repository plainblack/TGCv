import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketfiles = await useKind('HardwareTicketFile');
    const { id } = getRouterParams(event);
    const hardwareticketfile = await hardwareticketfiles.findOrDie(id);
    const s3file = await hardwareticketfile.parent('s3file');
    return await s3file.describe(describeParams(event));
});