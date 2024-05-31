import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere, obtainSession } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    const { id } = getRouterParams(event);
    const maintenanceticket = await maintenancetickets.findOrDie(id);
    const maintenanceremarks = await maintenanceticket.children('remarks');
    const all = await maintenanceremarks.findMany();
    const session = obtainSession(event);
    for (const record of all) {
        if (record.isOwner(session))
            await record.delete();
    }
    return await maintenanceremarks.describeList(describeListParams(event, session), describeListWhere(event, maintenanceremarks.describeListFilter()));
});