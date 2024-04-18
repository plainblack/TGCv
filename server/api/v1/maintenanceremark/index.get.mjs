import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenanceremarks = await useKind('MaintenanceRemark');
    return await maintenanceremarks.describeList(describeListParams(event), describeListWhere(event, maintenanceremarks.describeListFilter()));
});