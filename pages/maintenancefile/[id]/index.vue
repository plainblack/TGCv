<template>
    <Title>{{ maintenancefile.props?.id }}</Title>

    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>{{ maintenancefile.props?.id }}</h1>
    <div v-if="maintenancefile.props?.id" class="surface-card p-4 border-1 surface-border border-round flex-auto">

        <div><b>Id</b>: {{ maintenancefile.props?.id }}
            <CopyToClipboard size="xs" :text="maintenancefile.props?.id" />
        </div>

        <div><b>Created At</b>: {{ formatDateTime(maintenancefile.props?.createdAt) }}</div>

        <div><b>Updated At</b>: {{ formatDateTime(maintenancefile.props?.updatedAt) }}</div>

        <div><b>S3 File Id</b>: {{ maintenancefile.props?.s3FileId }}
            <CopyToClipboard size="xs" :text="maintenancefile.props?.s3FileId" />
        </div>

        <div><b>Maintenance Ticket Id</b>: {{ maintenancefile.props?.maintenanceTicketId }}
            <CopyToClipboard size="xs" :text="maintenancefile.props?.maintenanceTicketId" />
        </div>

    </div>
    <div class="mt-3" v-if="maintenancefile.meta?.isOwner">
        <NuxtLink :to="`/maintenancefile/${maintenancefile.props?.id}/edit`" class="no-underline mr-2 mb-2">
            <Button severity="success" title="Edit" alt="Edit Maintenance File"><i class="pi pi-pencil mr-1"></i>
                Edit</Button>
        </NuxtLink>
        <Button @click="maintenancefile.delete()" severity="danger" title="Delete" alt="Delete Maintenance File"><i
                class="pi pi-trash mr-1"></i> Delete</Button>
    </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id.toString();
const maintenancefile = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/maintenancefile/${id}`,
    query: { includeMeta: true, includeOptions: true },
    async onDelete() {
        await navigateTo('/maintenancefile');
    },
});
await maintenancefile.fetch();
onBeforeRouteLeave(() => maintenancefile.dispose());
const breadcrumbs = [
    { label: 'Maintenance Files', to: '/maintenancefile' },
    { label: 'View' },
];
</script>