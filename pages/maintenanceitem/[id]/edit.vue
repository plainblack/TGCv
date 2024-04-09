<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Item</h1>

    <FieldsetNav v-if="maintenanceitem.props">
        <FieldsetItem name="Properties">
            
                    <div class="mb-4">
                        <FormInput name="name" type="text" v-model="maintenanceitem.props.name" required label="Name" @change="maintenanceitem.update()" />
                    </div>
                    <div class="mb-4">
                        <FormSelect name="status" :options="maintenanceitem.options?.status" v-model="maintenanceitem.props.status" label="Status" @change="maintenanceitem.update()" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceItemSetId" type="text" v-model="maintenanceitem.props.maintenanceItemSetId" required label="Maintenance Item Set Id" @change="maintenanceitem.update()" />
                    </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">
            
            <div class="mb-4"><b>Id</b>: {{maintenanceitem.props?.id}}</div>
            
            <div class="mb-4"><b>Created At</b>: {{dt.formatDateTime(maintenanceitem.props.createdAt)}}</div>
            
            <div class="mb-4"><b>Updated At</b>: {{dt.formatDateTime(maintenanceitem.props.updatedAt)}}</div>
            
        </FieldsetItem>

        <FieldsetItem name="Actions">
            <NuxtLink :to="`/maintenanceitem/${maintenanceitem.props?.id}`" class="no-underline">
                <Button title="View" alt="View Maintenance Item" class="mr-2 mb-2"><i class="pi pi-eye mr-1"></i> View</Button>
            </NuxtLink>
            <Button @click="maintenanceitem.delete()" severity="danger" class="mr-2 mb-2" title="Delete" alt="Delete Maintenance Item"><i class="pi pi-trash mr-1"></i> Delete</Button>
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
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Maintenance Item.');
    },
    async onDelete() {
        await navigateTo('/maintenanceitem');
    },
});
await maintenanceitem.fetch()

const breadcrumbs = [
    { label: 'Maintenance Items', to: '/maintenanceitem' },
    { label: 'View', to: '/maintenanceitem/'+maintenanceitem.props.id },
    { label: 'Edit' },
];
</script>