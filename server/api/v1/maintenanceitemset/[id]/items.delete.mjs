import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere, obtainSession } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceitemsets = await useKind('MaintenanceItemSet');
    const { id } = getRouterParams(event);
    const maintenanceitemset = await maintenanceitemsets.findOrDie(id);
    const maintenanceitems = await maintenanceitemset.children('items');
    const all = await maintenanceitems.findMany();
    const session = obtainSession(event);
    for (const record of all) {
        if (record.isOwner(session))
            await record.delete();
    }
    return await maintenanceitems.describeList(describeListParams(event, session), describeListWhere(event, maintenanceitems.describeListFilter()));
});