<template>
    <div class="mb-4">
        <FormInput type="select"
            :options="hardwareitems.recordsAsOptions('props', 'name', (item) => item.props.status == 'in_use')"
            name="hardwareItemId" v-model="target.props.hardwareItemId" label="Equipment" @change="updateHardwareTasks">
        </FormInput>
    </div>
    <div class="mb-4">
        <FormInput type="select" :options="hardwaretasks.recordsAsOptions('props', 'description')" name="hardwareTaskId"
            placeholder="Choose Task" v-model="target.props.hardwareTaskId" label="Hardware Task"
            @change="target.update()">
        </FormInput>
    </div>
</template>

<script setup>
const props = defineProps({
    target: { required: true },
    taskFilter: { required: true },
});

const hardwaretasks = useVingKind({
    ego: 'hardwaretaskselectoredit',
    listApi: `/api/${useRestVersion()}/hardwaretasks`,
    createApi: `/api/${useRestVersion()}/hardwaretasks`,
    query: { sortBy: 'description' },
});
const hardwareitems = useVingKind({
    ego: 'hardwaretaskselectoredititem',
    listApi: `/api/${useRestVersion()}/hardwareitems`,
    createApi: `/api/${useRestVersion()}/hardwareitems`,
    query: { sortBy: 'name', ...props.taskFilter, },
});
await Promise.all([
    hardwareitems.all(),
    hardwaretasks.all(),
]);
const updateHardwareTasks = (async () => {
    const item = hardwareitems.records.find((item) => { return item.props.id == props.target.props.hardwareItemId });
    hardwaretasks.query.hardwareItemSetId = item.props.hardwareItemSetId;
    await hardwaretasks.dispose()
    await hardwaretasks.all();
    await props.target.update();
});
onBeforeRouteLeave(() => {
    hardwaretasks.dispose();
    hardwareitems.dispose();
});
</script>