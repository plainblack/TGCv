<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Item</h1>

    <FieldsetNav v-if="maintenanceitem.props">
        <FieldsetItem name="Properties">

            <div class="mb-4">
                <FormInput name="name" type="text" v-model="maintenanceitem.props.name" required label="Name"
                    @change="maintenanceitem.update()" />
            </div>
            <div class="mb-4">
                <FormSelect name="status" :options="maintenanceitem.options?.status"
                    v-model="maintenanceitem.props.status" label="Status" @change="maintenanceitem.update()" />
            </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">

            <div class="mb-4"><b>Id</b>: {{ maintenanceitem.props?.id }}
                <CopyToClipboard :text="maintenanceitem.props?.id" />
            </div>

            <div class="mb-4"><b>Created At</b>: {{ dt.formatDateTime(maintenanceitem.props.createdAt) }}</div>

            <div class="mb-4"><b>Updated At</b>: {{ dt.formatDateTime(maintenanceitem.props.updatedAt) }}</div>

        </FieldsetItem>

        <FieldsetItem name="Actions">
            <Button @click="maintenanceitem.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                alt="Delete Maintenance Item"><i class="pi pi-trash mr-1"></i> Delete</Button>
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
const maintenanceitem = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceitem/${id}`,
    createApi: `/api/${restVersion()}/maintenanceitem`,
    query: { includeMeta: true, includeOptions: true, includeRelated: ['itemSet'] },
    onUpdate() {
        notify.success('Updated Maintenance Item.');
    },
    async onDelete() {
        await navigateTo('/maintenanceitem');
    },
});

await maintenanceitem.fetch();
const breadcrumbs = [
    { label: 'Maintenance Item Sets', to: '/maintenanceitemset' },
    { label: `${maintenanceitem.related.itemSet.props.name}`, to: `/maintenanceitemset/${maintenanceitem.related.itemSet.props.id}` },
    { label: 'Edit Item' },
];
</script>