#!/usr/bin/env -S node --env-file=.env
import { useKind } from '#ving/record/utils.mjs';
import { maintenanceItems } from './maintenanceItems.mjs';
import { maintenanceSchedules } from './maintenanceSchedules.mjs';
import { eq, and } from '#ving/drizzle/orm.mjs';


import ving from '#ving/index.mjs'

const Sets = await useKind('HardwareItemSet');
const Items = await useKind('HardwareItem');
const Tasks = await useKind('HardwareTask');
const Schedules = await useKind('HardwareSchedule');

await Sets.deleteMany();
await Items.deleteMany();
await Tasks.deleteMany();
await Schedules.deleteMany();

const seenSets = [];
const itemLookup = [];

for (const item of maintenanceItems) {
    //Set == station
    if (!seenSets[item.station]) {
        //Create the Set
        const set = await Sets.create({
            name: item.station,
            status: item.status == 'In Use' ? 'in_use' : 'retired',
        });
        seenSets[item.station] = set;
        //Create tasks for the Set
        for (const task of item.tasks) {
            await Tasks.create({
                description: task,
                hardwareItemSetId: set.id,
            });
        }
    }
    //Create the item
    const itemObj = await Items.create({
        name: item.item,
        status: item.status == 'In Use' ? 'in_use' : 'retired',
        hardwareItemSetId: seenSets[item.station].id,
    });
    itemLookup[item.item] = itemObj;
}

for (const schedule of maintenanceSchedules) {
    const item = itemLookup[schedule.equipment];
    const set = await item.parent('itemSet');
    const task = await Tasks.findOne(
        and(
            eq(Tasks.hardwareItemSetId, item.hardwareItemSetId),
            eq(Tasks.description, schedule.event)
        )
    );
    const scheduleObject = await Schedules.create({
        recurrence: schedule.recurrence,
        weeks: schedule.weeks,
        months: schedule.months,
        days: schedule.days,
        hardwareItemId: item.id,
        hardwareTaskId: task.id,
        description: schedule.event,
    });
}

console.log("Done");
await ving.close();