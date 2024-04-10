import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancetickets = await useKind('MaintenanceTicket');
    return await maintenancetickets.describeList(describeListParams(event), describeListWhere(event, maintenancetickets.describeListFilter()));
});