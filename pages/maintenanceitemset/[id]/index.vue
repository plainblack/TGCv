<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Item Set</h1>

    <FieldsetNav v-if="maintenanceitemset.props">
        <FieldsetItem name="Properties">

            <div class="mb-4">
                <FormInput name="name" type="text" v-model="maintenanceitemset.props.name" required label="Name"
                    @change="maintenanceitemset.update()" />
            </div>
            <div class="mb-4">
                <FormSelect name="status" :options="maintenanceitemset.options?.status"
                    v-model="maintenanceitemset.props.status" label="Status" @change="maintenanceitemset.update()" />
            </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">

            <div class="mb-4"><b>Id</b>: {{ maintenanceitemset.props?.id }}</div>

            <div class="mb-4"><b>Created At</b>: {{ dt.formatDateTime(maintenanceitemset.props.createdAt) }}</div>

            <div class="mb-4"><b>Updated At</b>: {{ dt.formatDateTime(maintenanceitemset.props.updatedAt) }}</div>

        </FieldsetItem>

        <FieldsetItem name="Actions">
            <Button @click="maintenanceitemset.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                alt="Delete Maintenance Item Set"><i class="pi pi-trash mr-1"></i> Delete</Button>
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
const maintenanceitemset = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceitemset/${id}`,
    createApi: `/api/${restVersion()}/maintenanceitemset`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Maintenance Item Set.');
    },
    async onDelete() {
        await navigateTo('/maintenanceitemset');
    },
});
await maintenanceitemset.fetch()

const breadcrumbs = [
    { label: 'Maintenance Item Sets', to: '/maintenanceitemset' },
    { label: 'Edit' },
];
</script>