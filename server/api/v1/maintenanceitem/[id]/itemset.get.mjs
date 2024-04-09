import { useKind } from '#ving/record/utils.mjs';
import { describeParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitems = await useKind('MaintenanceItem');
    const { id } = getRouterParams(event);
    const maintenanceitem = await maintenanceitems.findOrDie(id);
    const itemset = await maintenanceitem.parent('itemset');
    return await itemset.describe(describeParams(event));
});