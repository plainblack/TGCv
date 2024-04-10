<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Task</h1>

    <FieldsetNav v-if="maintenancetask.props">
        <FieldsetItem name="Properties">

            <div class="mb-4">
                <FormInput name="description" type="text" v-model="maintenancetask.props.description" required
                    label="Description" @change="maintenancetask.update()" />
            </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">

            <div class="mb-4"><b>Id</b>: {{ maintenancetask.props?.id }}</div>

            <div class="mb-4"><b>Created At</b>: {{ dt.formatDateTime(maintenancetask.props.createdAt) }}</div>

            <div class="mb-4"><b>Updated At</b>: {{ dt.formatDateTime(maintenancetask.props.updatedAt) }}</div>

        </FieldsetItem>

        <FieldsetItem name="Actions">
            <Button @click="maintenancetask.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                alt="Delete Maintenance Task"><i class="pi pi-trash mr-1"></i> Delete</Button>
        </FieldsetItem>

    </FieldsetNav>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const dt = useDateTime();
const notify = useNotifyStore();
const id = route.params.id.toString();
const maintenancetask = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenancetask/${id}`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { includeMeta: true, includeOptions: true, includeRelated: ['itemSet'] },
    onUpdate() {
        notify.success('Updated Maintenance Task.');
    },
    async onDelete() {
        await navigateTo('/maintenancetask');
    },
});
await maintenancetask.fetch()

const breadcrumbs = [
    { label: `${maintenancetask.related.itemSet.props.name}`, to: `/maintenanceitemset/${maintenancetask.related.itemSet.props.id}` },
    { label: 'Edit Task' },
];
</script>