<template>
    <div class="mb-4">
        <FormInput type="select"
            :options="hardwareitems.recordsAsOptions('props', 'name', (item) => item.props.status == 'in_use')"
            name="hardwareItemId" placeholder="Choose Equipment" v-model="target.new.hardwareItemId" label="Equipment"
            @change="updateHardwareTasks">
        </FormInput>
    </div>
    <div class="mb-4">
        <FormInput type="select" :options="hardwaretasks.recordsAsOptions('props', 'description')" name="hardwareTaskId"
            placeholder="Choose Task" v-model="target.new.hardwareTaskId" label="Hardware Task">
        </FormInput>
    </div>
</template>

<script setup>
const props = defineProps({
    hardwareitems: Object,
    target: Object,
});

const hardwaretasks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwaretask`,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
    query: { sortBy: 'description' },
});
const updateHardwareTasks = (async () => {
    const item = props.hardwareitems.records.find((item) => { return item.props.id == props.target.new.hardwareItemId });
    hardwaretasks.query.hardwareItemSetId = item.props.hardwareItemSetId;
    await hardwaretasks.reset().all();
});
onBeforeRouteLeave(() => {
    hardwaretasks.dispose();
});
</script>