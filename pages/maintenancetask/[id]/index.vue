<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>{{maintenancetask.props?.id}}</h1>
    <div v-if="maintenancetask.props?.id" class="surface-card p-4 border-1 surface-border border-round flex-auto">
        
            <div><b>Id</b>: {{maintenancetask.props?.id}}</div>
            
            <div><b>Created At</b>: {{dt.formatDateTime(maintenancetask.props?.createdAt)}}</div>
            
            <div><b>Updated At</b>: {{dt.formatDateTime(maintenancetask.props?.updatedAt)}}</div>
            
            <div><b>Description</b>: {{maintenancetask.props?.description}}</div>
            
            <div><b>Maintenance Item Set Id</b>: {{maintenancetask.props?.maintenanceItemSetId}}</div>
            
    </div>
    <div class="mt-3" v-if="maintenancetask.meta?.isOwner">
        <NuxtLink :to="`/maintenancetask/${maintenancetask.props?.id}/edit`" class="no-underline mr-2 mb-2">
            <Button severity="success" title="Edit" alt="Edit Maintenance Task"><i class="pi pi-pencil mr-1"></i> Edit</Button>
        </NuxtLink>
        <Button @click="maintenancetask.delete()" severity="danger" title="Delete" alt="Delete Maintenance Task"><i class="pi pi-trash mr-1"></i> Delete</Button>
    </div>
</template>
  
<script setup>
const route = useRoute();
const id = route.params.id.toString();
const maintenancetask = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenancetask/${id}`,
    query: { includeMeta: true, includeOptions: true },
    async onDelete() {
        await navigateTo('/maintenancetask');
    },
});
await maintenancetask.fetch();
onBeforeRouteLeave(() => maintenancetask.dispose());
const dt = useDateTime();
const breadcrumbs = [
    { label: 'Maintenance Tasks', to: '/maintenancetask' },
    { label: 'View' },
];
</script>