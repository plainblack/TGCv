import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitemsets = await useKind('MaintenanceItemSet');
    const { id } = getRouterParams(event);
    const maintenanceitemset = await maintenanceitemsets.findOrDie(id);
    const maintenancetasks = await maintenanceitemset.children('tasks');
    return await maintenancetasks.describeList(describeListParams(event), describeListWhere(event, maintenancetasks.describeListFilter()));
});