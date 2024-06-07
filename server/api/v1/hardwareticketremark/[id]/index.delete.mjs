import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareticketremarks = await useKind('HardwareTicketRemark');
    const { id } = getRouterParams(event);
    const hardwareticketremark = await hardwareticketremarks.findOrDie(id);
    const session = obtainSession(event);
    await hardwareticketremark.canEdit(session);
    await hardwareticketremark.delete();
    return hardwareticketremark.describe(describeParams(event, session));
});