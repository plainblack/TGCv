import { useKind } from '#ving/record/utils.mjs';
import { obtainSession, describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitems = await useKind('HardwareItem');
    const { id } = getRouterParams(event);
    const hardwareitem = await hardwareitems.findOrDie(id);
    const session = obtainSession(event);
    await hardwareitem.canEdit(session);
    await hardwareitem.delete();
    return hardwareitem.describe(describeParams(event, session));
});