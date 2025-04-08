#!/usr/bin/env -S node --env-file=../.env

import { useKind } from '#ving/record/utils.mjs';
import ving from '#ving/index.mjs';

const Schedules = await useKind('HardwareSchedule');

const allSchedules = await Schedules.findAll();

for await (const schedule of allSchedules) {
    schedule.schedule = schedule.scheduleToCron();
    await schedule.update();
}

console.log("Done");
await ving.close();