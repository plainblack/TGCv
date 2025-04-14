import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketfiles = await useKind('HardwareTicketFile');
    const { id } = getRouterParams(event);
    const hardwareticketfile = await hardwareticketfiles.findOrDie(id);
    const session = obtainSession(event);
    await hardwareticketfile.canEdit(session);
    await hardwareticketfile.updateAndVerify(await getBody(event), session);
    return hardwareticketfile.describe(describeParams(event, session));
});