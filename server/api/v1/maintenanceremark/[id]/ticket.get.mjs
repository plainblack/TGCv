import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceremarks = await useKind('MaintenanceRemark');
    const { id } = getRouterParams(event);
    const maintenanceremark = await maintenanceremarks.findOrDie(id);
    const ticket = await maintenanceremark.parent('ticket');
    return await ticket.describe(describeParams(event));
});