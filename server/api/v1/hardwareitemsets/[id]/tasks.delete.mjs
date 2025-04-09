import { useKind } from '#ving/record/utils.mjs';
import { describeListParams, describeListWhere, obtainSession } from '#ving/utils/rest.mjs';
import {defineEventHandler, getRouterParams} from 'h3';
export default defineEventHandler(async (event) => {
    const hardwareitemsets = await useKind('HardwareItemSet');
    const { id } = getRouterParams(event);
    const hardwareitemset = await hardwareitemsets.findOrDie(id);
    const hardwaretasks = await hardwareitemset.children('tasks');
    const all = await hardwaretasks.findMany();
    const session = obtainSession(event);
    for (const record of all) {
        if (record.isOwner(session))
            await record.delete();
    }
    return await hardwaretasks.describeList(describeListParams(event, session), describeListWhere(event, hardwaretasks.describeListFilter()));
});