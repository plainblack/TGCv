import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceschedules = await useKind('MaintenanceSchedule');
    return await maintenanceschedules.describeList(describeListParams(event), describeListWhere(event, maintenanceschedules.describeListFilter()));
});