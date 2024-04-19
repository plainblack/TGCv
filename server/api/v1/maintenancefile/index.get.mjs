import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere } from '#ving/utils/rest.mjs';
import {defineEventHandler} from 'h3';
export default defineEventHandler(async (event) => {
    const maintenancefiles = await useKind('MaintenanceFile');
    return await maintenancefiles.describeList(describeListParams(event), describeListWhere(event, maintenancefiles.describeListFilter()));
});