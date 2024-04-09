import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetasks = await useKind('MaintenanceTask');
    const { id } = getRouterParams(event);
    const maintenancetask = await maintenancetasks.findOrDie(id);
    return maintenancetask.describe(describeParams(event));
});