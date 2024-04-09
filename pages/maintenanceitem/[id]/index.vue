<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>{{maintenanceitem.props?.name}}</h1>
    <div v-if="maintenanceitem.props?.id" class="surface-card p-4 border-1 surface-border border-round flex-auto">
        
            <div><b>Id</b>: {{maintenanceitem.props?.id}}</div>
            
            <div><b>Created At</b>: {{dt.formatDateTime(maintenanceitem.props?.createdAt)}}</div>
            
            <div><b>Updated At</b>: {{dt.formatDateTime(maintenanceitem.props?.updatedAt)}}</div>
            
            <div><b>Name</b>: {{maintenanceitem.props?.name}}</div>
            
            <div><b>Status</b>: {{enum2label(maintenanceitem.props?.status, maintenanceitem.options?.status)}}</div>
            
            <div><b>Maintenance Item Set Id</b>: {{maintenanceitem.props?.maintenanceItemSetId}}</div>
            
    </div>
    <div class="mt-3" v-if="maintenanceitem.meta?.isOwner">
        <NuxtLink :to="`/maintenanceitem/${maintenanceitem.props?.id}/edit`" class="no-underline mr-2 mb-2">
            <Button severity="success" title="Edit" alt="Edit Maintenance Item"><i class="pi pi-pencil mr-1"></i> Edit</Button>
        </NuxtLink>
        <Button @click="maintenanceitem.delete()" severity="danger" title="Delete" alt="Delete Maintenance Item"><i class="pi pi-trash mr-1"></i> Delete</Button>
    </div>
</template>
  
<script setup>
const route = useRoute();
const id = route.params.id.toString();
const maintenanceitem = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceitem/${id}`,
    query: { includeMeta: true, includeOptions: true },
    async onDelete() {
        await navigateTo('/maintenanceitem');
    },
});
await maintenanceitem.fetch();
onBeforeRouteLeave(() => maintenanceitem.dispose());
const dt = useDateTime();
const breadcrumbs = [
    { label: 'Maintenance Items', to: '/maintenanceitem' },
    { label: 'View' },
];
</script>