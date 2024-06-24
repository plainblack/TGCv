#!/usr/bin/env -S node --env-file=.env
import { useKind } from '#ving/record/utils.mjs';
import { maintenanceItems } from './maintenanceItems.mjs';
import ving from '#ving/index.mjs'

const Sets = await useKind('HardwareItemSet');
const Items = await useKind('HardwareItem');
const Tasks = await useKind('HardwareTask');

await Sets.deleteMany();
await Items.deleteMany();
await Tasks.deleteMany();

if (1) {

    const seenSets = [];

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
        await Items.create({
            name: item.item,
            status: item.status == 'In Use' ? 'in_use' : 'retired',
            hardwareItemSetId: seenSets[item.station].id,
        });
    }

}

console.log("Done");
await ving.close();