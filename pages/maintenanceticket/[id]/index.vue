<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>{{ maintenanceticket.meta?.fullName }}</h1>
    <div v-if="maintenanceticket.props?.id" class="surface-card p-4 border-1 surface-border border-round flex-auto">

        <div><b>Task</b>: {{ maintenanceticket.related?.task.props.description }}
            <CopyToClipboard :text="maintenanceticket.props?.maintenanceTaskId" />
        </div>

        <div><b>Item</b>: {{ maintenanceticket.related?.item.props.name }}
            <CopyToClipboard :text="maintenanceticket.props?.maintenanceItemId" />
        </div>
        <div><b>Description</b>: {{ maintenanceticket.props?.description }}</div>

        <div><b>Type</b>: {{ enum2label(maintenanceticket.props?.type, maintenanceticket.options?.type) }}</div>

        <div><b>Severity</b>: {{ enum2label(maintenanceticket.props?.severity, maintenanceticket.options?.severity) }}
        </div>

        <div><b>Status</b>: {{ enum2label(maintenanceticket.props?.status, maintenanceticket.options?.status) }}</div>

        <div><b>Resolution Minutes</b>: {{ maintenanceticket.props?.resolutionMinutes }}</div>

        <div><b>Submitted By</b>: {{ maintenanceticket.props?.submittedBy }}</div>

        <div><b>Id</b>: {{ maintenanceticket.props?.id }}
            <CopyToClipboard :text="maintenanceticket.props?.id" />
        </div>

        <div><b>Created At</b>: {{ dt.formatDateTime(maintenanceticket.props?.createdAt) }}</div>

        <div><b>Updated At</b>: {{ dt.formatDateTime(maintenanceticket.props?.updatedAt) }}</div>


    </div>
    <div class="mt-3" v-if="maintenanceticket.meta?.isOwner">
        <NuxtLink :to="`/maintenanceticket/${maintenanceticket.props?.id}/edit`" class="no-underline mr-2 mb-2">
            <Button severity="success" title="Edit" alt="Edit Maintenance Ticket"><i class="pi pi-pencil mr-1"></i>
                Edit</Button>
        </NuxtLink>
        <Button @click="maintenanceticket.delete()" severity="danger" title="Delete" alt="Delete Maintenance Ticket"><i
                class="pi pi-trash mr-1"></i> Delete</Button>
    </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id.toString();
const maintenanceticket = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceticket/${id}`,
    query: { includeMeta: true, includeOptions: true, includeRelated: ['item', 'task'] },
    async onDelete() {
        await navigateTo('/maintenanceticket');
    },
});
await maintenanceticket.fetch();
onBeforeRouteLeave(() => maintenanceticket.dispose());
const dt = useDateTime();
const breadcrumbs = [
    { label: 'Maintenance Tickets', to: '/maintenanceticket' },
    { label: 'View' },
];
</script>