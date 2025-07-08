#!/usr/bin/env -S node --env-file=../.env

import { useKind } from '#ving/record/utils.mjs';
import ving from '#ving/index.mjs';
import { stringifyId } from '#ving/utils/int2str.mjs';

const Items = await useKind('HardwareItem');
const allItems = await Items.findAll();

for await (const item of allItems) {
   console.log('"%s","https://www.thegamecrafter.com/hardwaretickets?hardwareItemId=%s","%s"', item.name, stringifyId(item.id), item.status);
}

console.log("Done");
await ving.close();
