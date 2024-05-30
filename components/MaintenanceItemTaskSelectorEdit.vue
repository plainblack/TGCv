<template>
    <div class="mb-4">
        <FormInput type="select" :options="maintenanceitems.recordsAsOptions('props', 'name')" name="maintenanceItemId"
            v-model="target.props.maintenanceItemId" label="Equipment" @change="updateMaintenanceTasks">
        </FormInput>
    </div>
    <div class="mb-4">
        <FormInput type="select" :options="maintenancetasks.recordsAsOptions('props', 'description')" name="maintenanceTaskId"
            v-model="target.props.maintenanceTaskId" label="Maintenance Task" @change="target.update()">
        </FormInput>
    </div>
</template>

<script setup>
const props = defineProps({
    target: Object,
});

const maintenancetasks = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenancetask`,
    createApi: `/api/${useRestVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});
const maintenanceitems = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenanceitem`,
    createApi: `/api/${useRestVersion()}/maintenanceitem`,
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