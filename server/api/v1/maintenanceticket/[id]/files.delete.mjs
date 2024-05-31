import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere, obtainSession } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    const { id } = getRouterParams(event);
    const maintenanceticket = await maintenancetickets.findOrDie(id);
    const maintenancefiles = await maintenanceticket.children('files');
    const all = await maintenancefiles.findMany();
    const session = obtainSession(event);
    for (const record of all) {
        if (record.isOwner(session))
            await record.delete();
    }
    return await maintenancefiles.describeList(describeListParams(event, session), describeListWhere(event, maintenancefiles.describeListFilter()));
});