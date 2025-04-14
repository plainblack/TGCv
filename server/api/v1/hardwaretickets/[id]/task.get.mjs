import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwaretickets = await useKind('HardwareTicket');
    const { id } = getRouterParams(event);
    const hardwareticket = await hardwaretickets.findOrDie(id);
    const task = await hardwareticket.parent('task');
    return await task.describe(describeParams(event));
});