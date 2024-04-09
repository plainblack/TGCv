import { useKind } from '#ving/record/utils.mjs';
import { describeListParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitemsets = await useKind('MaintenanceItemSet');
    const { id } = getRouterParams(event);
    const maintenanceitemset = await maintenanceitemsets.findOrDie(id);
    const MaintenanceTasks = await maintenanceitemset.children('tasks');
    return await maintenancetasks.describeList(describeListParams(event), describeListWhere(event, maintenancetasks.describeListFilter()));
});