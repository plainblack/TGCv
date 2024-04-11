<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>{{ maintenanceschedule.props?.id }}</h1>
    <div v-if="maintenanceschedule.props?.id" class="surface-card p-4 border-1 surface-border border-round flex-auto">

        <div><b>Id</b>: {{ maintenanceschedule.props?.id }}
            <CopyToClipboard :text="maintenanceschedule.props?.id" />
        </div>

        <div><b>Created At</b>: {{ dt.formatDateTime(maintenanceschedule.props?.createdAt) }}</div>

        <div><b>Updated At</b>: {{ dt.formatDateTime(maintenanceschedule.props?.updatedAt) }}</div>

        <div><b>Recurrence</b>: {{ enum2label(maintenanceschedule.props?.recurrence,
        maintenanceschedule.options?.recurrence) }}</div>

        <div><b>Months</b>: {{ maintenanceschedule.props?.months }}</div>

        <div><b>Weeks</b>: {{ maintenanceschedule.props?.weeks }}</div>

        <div><b>Days</b>: {{ maintenanceschedule.props?.days }}</div>

        <div><b>Maintenance Item Set Id</b>: {{ maintenanceschedule.props?.maintenanceItemSetId }}
            <CopyToClipboard :text="maintenanceschedule.props?.maintenanceItemSetId" />
        </div>

        <div><b>Maintenance Task Id</b>: {{ maintenanceschedule.props?.maintenanceTaskId }}
            <CopyToClipboard :text="maintenanceschedule.props?.maintenanceTaskId" />
        </div>

    </div>
    <div class="mt-3" v-if="maintenanceschedule.meta?.isOwner">
        <NuxtLink :to="`/maintenanceschedule/${maintenanceschedule.props?.id}/edit`" class="no-underline mr-2 mb-2">
            <Button severity="success" title="Edit" alt="Edit Maintenance Schedule"><i class="pi pi-pencil mr-1"></i>
                Edit</Button>
        </NuxtLink>
        <Button @click="maintenanceschedule.delete()" severity="danger" title="Delete"
            alt="Delete Maintenance Schedule"><i class="pi pi-trash mr-1"></i> Delete</Button>
    </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id.toString();
const maintenanceschedule = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceschedule/${id}`,
    query: { includeMeta: true, includeOptions: true },
    async onDelete() {
        await navigateTo('/maintenanceschedule');
    },
});
await maintenanceschedule.fetch();
const dt = useDateTime();
const breadcrumbs = [
    { label: 'Maintenance Schedules', to: '/maintenanceschedule' },
    { label: 'View' },
];
onBeforeRouteLeave(() => maintenanceschedule.dispose());

</script>