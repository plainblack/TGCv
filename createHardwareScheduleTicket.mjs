#!/usr/bin/env -S node --env-file=.env
import { useKind } from '#ving/record/utils.mjs';
import { maintenanceSchedules } from './maintenanceSchedules.mjs';
import { eq, and } from '#ving/drizzle/orm.mjs';

import ving from '#ving/index.mjs'

const Schedules = await useKind('HardwareSchedule');

import { argv } from 'node:process';
const scheduleId = Number(argv[2]);
console.log(scheduleId);

const schedule = await Schedules.findOrDie( scheduleId );

await schedule.createTicket();

//await schedule.createTicket();

console.log("Done");
await ving.close();
