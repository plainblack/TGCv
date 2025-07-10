#!/usr/bin/env -S node --env-file=../.env

import { useKind } from '#ving/record/utils.mjs';
import ving from '#ving/index.mjs';

const Items = await useKind('HardwareItem');
const allItems = await Items.findAll();

for await (const item of allItems) {
   console.log('"%s","https://www.thegamecrafter.com/hardwaretickets?hardwareItemId=%s","%s"', item.name, item.idAsString(), item.status);
}

console.log("Done");
await ving.close();
