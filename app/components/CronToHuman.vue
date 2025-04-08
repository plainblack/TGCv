<template>
    <div>{{ translate(schedule) }}</div>
</template>

<script setup>
import cronstrue from 'cronstrue';
import { isValidCron } from 'cron-validator';

const props = defineProps({
    schedule: { required: true },
});
function translate(schedule) {
    if (isValidCron(schedule, { alias: true, allowSevenAsSunday: true, allowNthWeekdayOfMonth: true })) {
        return cronstrue.toString(schedule, { verbose: true });
    }
    else {
        return "Invalid cron schedule.";
    }
}

</script>