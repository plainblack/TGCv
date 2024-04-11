<template>
    <div class="mb-4">
        <FormSelect :options="maintenanceitems.recordsAsOptions('props', 'name')" name="maintenanceItemId"
            v-model="target.new.maintenanceItemId" label="Equipment" @change="updateMaintenanceTasks">
        </FormSelect>
    </div>
    <div class="mb-4">
        <FormSelect :options="maintenancetasks.recordsAsOptions('props', 'description')" name="maintenanceTaskId"
            v-model="target.new.maintenanceTaskId" label="Maintenance Task">
        </FormSelect>
    </div>
</template>

<script setup>
const props = defineProps({
    maintenanceitems: Object,
    target: Object,
});

const maintenancetasks = useVingKind({
    listApi: `/api/${restVersion()}/maintenancetask`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});
const updateMaintenanceTasks = (async () => {
    const item = props.maintenanceitems.records.find((item) => { return item.props.id == props.target.new.maintenanceItemId });
    maintenancetasks.query.maintenanceItemSetId = item.props.maintenanceItemSetId;
    await maintenancetasks.reset().all();
});
onBeforeRouteLeave(() => {
    maintenancetasks.dispose();
});
</script>