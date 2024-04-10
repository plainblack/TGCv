import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceschedules = await useKind('MaintenanceSchedule');
    const { id } = getRouterParams(event);
    const maintenanceschedule = await maintenanceschedules.findOrDie(id);
    const item = await maintenanceschedule.parent('item');
    return await item.describe(describeParams(event));
});