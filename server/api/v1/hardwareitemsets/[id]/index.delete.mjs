import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitemsets = await useKind('HardwareItemSet');
    const { id } = getRouterParams(event);
    const hardwareitemset = await hardwareitemsets.findOrDie(id);
    const session = obtainSession(event);
    await hardwareitemset.canEdit(session);
    await hardwareitemset.delete();
    return hardwareitemset.describe(describeParams(event, session));
});