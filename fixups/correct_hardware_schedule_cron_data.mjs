#!/usr/bin/env -S node --env-file=../.env

import { useKind } from '#ving/record/utils.mjs';
import ving from '#ving/index.mjs';

const Schedules = await useKind('HardwareSchedule');
const CronJobs = await useKind('CronJob');

const allSchedules = await Schedules.findAll();

for await (const schedule of allSchedules) {
    const cron = await CronJobs.findOrDie(schedule.get('cronJobId'));
    cron.set('params', { id: schedule.id });
    await cron.update();
}

console.log("Done");
await ving.close();