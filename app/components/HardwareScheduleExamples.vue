<template>
    <DataTable :value="examples" stripedRows>
        <Column field="example" header="Example" />
        <Column field="recurrence" header="Recurrence" />
        <Column field="months" header="Months" />
        <Column field="weeks" header="Weeks" />
        <Column field="days" header="Days" />
    </DataTable>
</template>

<script setup>
const examples = [
    {
        example: "Every Day",
        recurrence: "Daily",
        months: 0,
        weeks: 0,
        days: 0,
    },
    {
        example: "Every week on Tuesday",
        recurrence: "Weekly",
        months: 0,
        weeks: 0,
        days: 2,
    },
    {
        example: "Every week on Thursday",
        recurrence: "Weekly",
        months: 0,
        weeks: 0,
        days: 4,
    },
    {
        example: "First day of every month",
        recurrence: "Monthly",
        months: 0,
        weeks: 0,
        days: 1,
    },
    {
        example: "Tenth day of every month",
        recurrence: "Monthly",
        months: 0,
        weeks: 0,
        days: 10,
    },
    {
        example: "Third Tuesday of every month",
        recurrence: "Monthly",
        months: 0,
        weeks: 3,
        days: 2,
    },
    {
        example: "Tenth day of every year",
        recurrence: "Yearly",
        months: 0,
        weeks: 0,
        days: 10,
    },
    {
        example: "Tenth day of every December",
        recurrence: "Yearly",
        months: 12,
        weeks: 0,
        days: 10,
    },
    {
        example: "Third Tuesday of every month",
        recurrence: "Yearly",
        months: 0,
        weeks: 3,
        days: 2,
    },
];
</script>