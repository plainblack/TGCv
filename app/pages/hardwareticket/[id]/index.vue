<template>
    <Title>{{ `Ticket ${hardwareticket.meta?.ticketNumber} ` }}</Title>
    <PanelFrame section="Tickets" :title="`Ticket ${hardwareticket.meta?.ticketNumber}`">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone :title="`Ticket ${hardwareticket.meta?.ticketNumber}`">

                <div><b>Item</b>: {{ hardwareticket.related?.item?.props?.name }}
                    <CopyToClipboard size="xs" :text="hardwareticket.props?.hardwareItemId" />
                </div>
                <div><b>Task</b>: {{ hardwareticket.related?.task?.props?.description }}
                    <CopyToClipboard size="xs" :text="hardwareticket.props?.hardwareTaskId" />
                </div>
                <div><b>Description</b>:
                    <MarkdownView :text="hardwareticket.props?.description" />
                </div>

                <div><b>Type</b>: {{ enum2label(hardwareticket.props?.type, hardwareticket.options?.type) }}</div>

                <div><b>Severity</b>: {{ enum2label(hardwareticket.props?.severity,
        hardwareticket.options?.severity) }}
                </div>

                <div><b>Status</b>: {{ enum2label(hardwareticket.props?.status, hardwareticket.options?.status) }}
                </div>

                <div><b>Resolution Minutes</b>: {{ hardwareticket.props?.resolutionMinutes }}</div>

                <div><b>Submitted By</b>: {{ hardwareticket.props?.submittedBy }}</div>

                <div><b>Id</b>: {{ hardwareticket.props?.id }}
                    <CopyToClipboard size="xs" :text="hardwareticket.props?.id" />
                </div>

                <div><b>Created At</b>: {{ formatDateTime(hardwareticket.props?.createdAt) }}</div>

                <div><b>Updated At</b>: {{ formatDateTime(hardwareticket.props?.updatedAt) }}</div>

                <HardwareTicketFile v-for=" file  in  hardwarefiles.records " :key="file.props.id" :mFile="file" />
                <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
                    <h2 class="mt-0">Add Comment</h2>

                    <Form :send="() => hardwareremarks.create()">
                        <div class="grid">

                            <div class="col-8">
                                <div class="mb-4">
                                    <FormInput name="description" type="markdown"
                                        v-model="hardwareremarks.new.description" required label="Description" />
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="mb-4">
                                    <FormInput type="select" name="resolution"
                                        :options="hardwareremarks.propsOptions?.resolution"
                                        v-model="hardwareremarks.new.resolution" label="Resolution" />
                                </div>
                                <div class="mb-4">
                                    <FormInput name="submittedBy" type="text" v-model="hardwareremarks.new.submittedBy"
                                        required label="Submitted By" />
                                </div>
                                <div class="mb-4">
                                    <FormInput name="resolutionMinutes" type="number"
                                        v-model="hardwareremarks.new.resolutionMinutes" label="Time Spent" />
                                </div>
                                <div>
                                    <Button type="submit" class="w-auto" severity="success">
                                        <i class="pi pi-plus mr-1"></i> Add Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>

                <HardwareTicketRemark v-for=" remark  in  hardwareremarks.records " :key="remark.props?.id"
                    :remark="remark" />

                <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
                    <h2 class="mt-0">Add Files</h2>
                    <div class="mb-4">
                        <client-only>
                            <Dropzone :afterUpload="uploadHardwareFile">
                            </Dropzone>
                        </client-only>
                    </div>
                </div>

                <div class="mt-3" v-if="hardwareticket.meta?.isOwner">
                    <NuxtLink :to="`/hardwareticket/${hardwareticket.props?.id}/edit`" class="no-underline mr-2 mb-2">
                        <Button severity="success" title="Edit" alt="Edit Hardware Ticket"><i
                                class="pi pi-pencil mr-1"></i>
                            Edit</Button>
                    </NuxtLink>
                    <Button @click="hardwareticket.delete()" severity="danger" title="Delete"
                        alt="Delete Hardware Ticket"><i class="pi pi-trash mr-1"></i> Delete</Button>
                </div>
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const id = route.params.id.toString();
const links = useHardwareLinks();

const hardwareticket = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwareticket/${id}`,
    query: { includeMeta: true, includeOptions: true, includeRelated: ['item', 'task'] },
    async onDelete() {
        await navigateTo('/hardwareticket');
    },
});
await hardwareticket.fetch();

const hardwareremarks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareticketremark`,
    createApi: `/api/${useRestVersion()}/hardwareticketremark`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', },
    newDefaults: { description: '', resolution: 'n_a', resolutionMinutes: 0, submittedBy: 'YOUR INITIALS', hardwareTicketId: hardwareticket.props?.id },
    async onCreate() {
        await hardwareticket.fetch();
    },
    async onDelete() {
        await hardwareticket.fetch();
    }
});
const hardwarefiles = useVingKind({
    listApi: `${hardwareticket.links.self.href}/files`,
    createApi: `/api/${useRestVersion()}/hardwareticketfile`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', includeRelated: ['s3file'], },
    newDefaults: { s3FileId: '', hardwareTicketId: hardwareticket.props?.id },
});

const uploadHardwareFile = async (s3file) => {
    const response = await hardwarefiles.create({ s3FileId: s3file.props?.id });
    const file = hardwarefiles.find(response.data?.props?.id);
    await file.importS3File('s3file', s3file.props?.id);
};

await Promise.all([
    hardwareremarks.search(),
    hardwareremarks.fetchPropsOptions(),
    hardwarefiles.search(),
    hardwarefiles.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => {
    hardwareremarks.dispose();
    hardwareticket.dispose();
    hardwarefiles.dispose();
});

</script>
