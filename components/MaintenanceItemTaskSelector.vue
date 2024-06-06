<template>
    <div class="mb-4">
        <FormInput type="select" :options="maintenanceitems.recordsAsOptions('props', 'name', (item) => item.props.status == 'in_use')" name="maintenanceItemId"
            placeholder="Choose Equipment" v-model="target.new.maintenanceItemId" label="Equipment" @change="updateMaintenanceTasks">
        </FormInput>
    </div>
    <div class="mb-4">
        <FormInput type="select" :options="maintenancetasks.recordsAsOptions('props', 'description')" name="maintenanceTaskId"
        placeholder="Choose Task" v-model="target.new.maintenanceTaskId" label="Maintenance Task">
        </FormInput>
    </div>
</template>

<script setup>
const props = defineProps({
    maintenanceitems: Object,
    target: Object,
});

const maintenancetasks = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenancetask`,
    createApi: `/api/${useRestVersion()}/maintenancetask`,
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