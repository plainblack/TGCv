import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancefiles = await useKind('MaintenanceFile');
    const { id } = getRouterParams(event);
    const maintenancefile = await maintenancefiles.findOrDie(id);
    return maintenancefile.describe(describeParams(event));
});