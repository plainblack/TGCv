import { useKind } from '#ving/record/utils.mjs';
import { describeParams, obtainSession, getBody } from '#ving/utils/rest.mjs';
import { defineEventHandler, getRouterParams } from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    const { id } = getRouterParams(event);
    const hardwareticket = await hardwaretickets.findOrDie(id);
    const session = obtainSession(event);
    await hardwareticket.canEdit(session);
    const newClaimant = await session.user();
    hardwareticket.set('claimedByUserId', newClaimant.id);
    await hardwareticket.update();
    return hardwareticket.describe(describeParams(event, session));
});