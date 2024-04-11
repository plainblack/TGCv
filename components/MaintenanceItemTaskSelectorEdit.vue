<template>
    <div class="mb-4">
        <FormSelect :options="maintenanceitems.recordsAsOptions('props', 'name')" name="maintenanceItemId"
            v-model="target.props.maintenanceItemId" label="Equipment" @change="updateMaintenanceTasks">
        </FormSelect>
    </div>
    <div class="mb-4">
        <FormSelect :options="maintenancetasks.recordsAsOptions('props', 'description')" name="maintenanceTaskId"
            v-model="target.props.maintenanceTaskId" label="Maintenance Task" @change="target.update()">
        </FormSelect>
    </div>
</template>

<script setup>
const props = defineProps({
    target: Object,
});

const maintenancetasks = useVingKind({
    listApi: `/api/${restVersion()}/maintenancetask`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});
const maintenanceitems = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceitem`,
    createApi: `/api/${restVersion()}/maintenanceitem`,
    query: { sortBy: 'name' },
});
await Promise.all([
    maintenanceitems.all(),
    maintenancetasks.all(),
]);
const updateMaintenanceTasks = (async () => {
    const item = maintenanceitems.records.find((item) => { return item.props.id == props.target.props.maintenanceItemId });
    maintenancetasks.query.maintenanceItemSetId = item.props.maintenanceItemSetId;
    await maintenancetasks.reset().all();
    await props.target.update();
});
onBeforeRouteLeave(() => {
    maintenancetasks.dispose();
    maintenanceitems.dispose();
});
</script>