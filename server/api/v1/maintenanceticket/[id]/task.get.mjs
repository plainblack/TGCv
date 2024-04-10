import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    const { id } = getRouterParams(event);
    const maintenanceticket = await maintenancetickets.findOrDie(id);
    const task = await maintenanceticket.parent('task');
    return await task.describe(describeParams(event));
});