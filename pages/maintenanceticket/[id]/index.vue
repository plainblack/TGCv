<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>{{ maintenanceticket.props?.ticketNumber }}</h1>
    <div v-if="maintenanceticket.props?.id" class="surface-card p-4 border-1 surface-border border-round flex-auto">

        <div><b>Item</b>: {{ maintenanceticket.related?.item.props.name }}
            <CopyToClipboard :text="maintenanceticket.props?.maintenanceItemId" />
        </div>
        <div><b>Task</b>: {{ maintenanceticket.related?.task.props.description }}
            <CopyToClipboard :text="maintenanceticket.props?.maintenanceTaskId" />
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
    <MaintenanceFile v-for="file in maintenancefiles.records" :key="file.props.id" :mFile="file" />
    <MaintenanceRemark v-for="remark in maintenanceremarks.records" :key="remark.props?.id" :remark="remark"/>

    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Add Files</h2>
        <div class="mb-4">
            <client-only>
                <Dropzone
                    :acceptedFiles="['.png', '.jpeg', '.jpg', '.gif', '.pdf', '.tiff', '.svg', '.dxf', '.csv']"
                    :afterUpload="uploadMaintenanceFile">
                </Dropzone>
            </client-only>
        </div>
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
const maintenanceremarks = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceremark`,
    createApi: `/api/${restVersion()}/maintenanceremark`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', },
    newDefaults: { description: '', resolution: 'n_a',resolutionMinutes: 0, submittedBy: '', maintenanceTicketId: maintenanceticket.props.id },
    async onCreate() {
        await maintenanceticket.fetch();
    },
    async onDelete() {
        await maintenanceticket.fetch();
    }
});
const maintenancefiles = useVingKind({
    listApi: `/api/${restVersion()}/maintenancefile`,
    createApi: `/api/${restVersion()}/maintenancefile`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', includeRelated: ['s3file'], },
    newDefaults: { s3FileId: '', maintenanceTicketId: maintenanceticket.props.id },
});

const uploadMaintenanceFile = async (s3file) => {
    const response = await maintenancefiles.create({s3FileId: s3file.props?.id});
    const file = maintenancefiles.find(response.data?.props?.id);
    await file.importS3File('s3file', s3file.props?.id);
};

await Promise.all([
    maintenanceremarks.search(),
    maintenanceremarks.fetchPropsOptions(),
    maintenancefiles.search(),
    maintenancefiles.fetchPropsOptions(),
    maintenanceticket.fetch(),
]);
onBeforeRouteLeave(() => {
    maintenanceremarks.dispose();
    maintenanceticket.dispose();
    maintenancefiles.dispose();
});
const dt = useDateTime();
const breadcrumbs = [
    { label: 'Maintenance Tickets', to: '/maintenanceticket' },
    { label: 'View' },
];
</script>