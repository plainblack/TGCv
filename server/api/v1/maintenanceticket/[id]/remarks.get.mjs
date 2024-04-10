import { useKind } from '#ving/record/utils.mjs';
import { describeListParams } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    const { id } = getRouterParams(event);
    const maintenanceticket = await maintenancetickets.findOrDie(id);
    const MaintenanceRemarks = await maintenanceticket.children('remarks');
    return await maintenanceremarks.describeList(describeListParams(event), describeListWhere(event, maintenanceremarks.describeListFilter()));
});