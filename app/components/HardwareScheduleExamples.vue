<template>
    <DataTable :value="examples" stripedRows>
        <Column field="example" header="Example" />
        <Column field="schedule" header="Schedule" />
    </DataTable>
</template>

<script setup>
const examples = [
    {
        example: "Basic cron format",
        schedule: "1 10 DayOfMonth Month DayOfWeek",
    },
    {
        example: "Every Day",
        schedule: "1 10 * * *",
    },
    {
        example: "Every week on Tuesday",
        schedule: "1 10 * * 2",
    },
    {
        example: "Every week on Tuesday using day name",
        schedule: "1 10 * * Tue",
    },
    {
        example: "Every week on Thursday",
        schedule: "1 10 * * 4",
    },
    {
        example: "Every week on Thursday using day name",
        schedule: "1 10 * * Thu",
    },
    {
        example: "First day of every month",
        schedule: "1 10 1 * *",
    },
    {
        example: "Tenth day of every month",
        schedule: "1 10 10 * *",
    },
    {
        example: "Third Tuesday of every month",
        schedule: "31 1 * * 2#3",
    },
    {
        example: "Tenth day of every year",
        schedule: "1 10 10 1 *",
    },
    {
        example: "Tenth day of every December",
        schedule: "1 10 10 12 *",
    },
];
</script>