<template>
    <div class="mb-4">
        <FormInput type="select"
            :options="hardwareitems.recordsAsOptions('props', 'name', (item) => item.props.status == 'in_use')"
            name="hardwareItemId" v-model="target.props.hardwareItemId" label="Equipment" @change="updateHardwareTasks">
        </FormInput>
    </div>
    <div class="mb-4">
        <FormInput type="select" :options="hardwaretasks.recordsAsOptions('props', 'description')" name="hardwareTaskId"
            v-model="target.props.hardwareTaskId" label="Hardware Task" @change="target.update()">
        </FormInput>
    </div>
</template>

<script setup>
const props = defineProps({
    target: Object,
});

const hardwaretasks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwaretask`,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
    query: { sortBy: 'description' },
});
const hardwareitems = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareitem`,
    createApi: `/api/${useRestVersion()}/hardwareitem`,
    query: { sortBy: 'name' },
});
await Promise.all([
    hardwareitems.all(),
    hardwaretasks.all(),
]);
const updateHardwareTasks = (async () => {
    const item = hardwareitems.records.find((item) => { return item.props.id == props.target.props.hardwareItemId });
    hardwaretasks.query.hardwareItemSetId = item.props.hardwareItemSetId;
    await hardwaretasks.reset().all();
    await props.target.update();
});
onBeforeRouteLeave(() => {
    hardwaretasks.dispose();
    hardwareitems.dispose();
});
</script>