<template>
    <Title>{{ maintenancefile.props?.id }}</Title>

    <PanelFrame section="Files" title="View Hardware File">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone :title="maintenancefile.props?.id">

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

                <div class="mt-3" v-if="maintenancefile.meta?.isOwner">
                    <NuxtLink :to="`/maintenancefile/${maintenancefile.props?.id}/edit`" class="no-underline mr-2 mb-2">
                        <Button severity="success" title="Edit" alt="Edit Maintenance File"><i
                                class="pi pi-pencil mr-1"></i>
                            Edit</Button>
                    </NuxtLink>
                    <Button @click="maintenancefile.delete()" severity="danger" title="Delete"
                        alt="Delete Maintenance File"><i class="pi pi-trash mr-1"></i> Delete</Button>
                </div>
            </PanelZone>
        </template>
    </PanelFrame>

    <script setup>
const route = useRoute();
const links = useMaintenanceLinks();
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

</script>
