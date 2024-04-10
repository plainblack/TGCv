import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceschedules = await useKind('MaintenanceSchedule');
    const { id } = getRouterParams(event);
    const maintenanceschedule = await maintenanceschedules.findOrDie(id);
    const task = await maintenanceschedule.parent('task');
    return await task.describe(describeParams(event));
});