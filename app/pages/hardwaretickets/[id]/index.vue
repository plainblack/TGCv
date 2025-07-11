<template>
    <Title>{{ `Ticket ${hardwareticket.meta?.ticketNumber} ` }}</Title>
    <PanelFrame section="Tickets" :title="`Ticket ${hardwareticket.meta?.ticketNumber}`">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #right>
            <JumpToTicket />
        </template>
        <template #content>

            <FieldsetNav v-if="hardwareticket.props">
                <FieldsetItem name="Description">
                    <client-only><MarkdownView :text="hardwareticket.props?.description" class="px-2" /></client-only>
                </FieldsetItem>

                <FieldsetItem name="Actions" v-if="hardwareticket.meta?.isOwner">

                    <Button @click="showAddComment = !showAddComment" severity="success" title="Add Comment"
                        class=" mr-2 mb-2" alt="Comment on Ticket"><i class="pi pi-comment mr-1"></i> Add Comment /
                        Resolve</Button>

                    <Button @click="showAddFiles = !showAddFiles" severity="primary" title="Add Files"
                        class=" mr-2 mb-2" alt="Upload Files to Ticket"><i class="pi pi-file mr-1"></i> Add
                        Files</Button>

                    <NuxtLink :to="`/hardwaretickets/${hardwareticket.props?.id}/edit`" class="no-underline mr-2 mb-2">
                        <Button severity="primary" title="Edit" alt="Edit Hardware Ticket"><i
                                class="pi pi-pencil mr-1"></i>
                            Edit</Button>
                    </NuxtLink>
                    <Button @click="hardwareticket.delete()" severity="danger" title="Delete" class=" mr-2 mb-2"
                        alt="Delete Hardware Ticket"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    <FormInput name="claimedBy" type="text" v-model="hardwareticket.props.claimedBy" label="Claimed by"
                        placeholder="Your initials" @change="hardwareticket.save('claimedBy')" />
                </FieldsetItem>


                <FieldsetItem v-if="showAddFiles" name="Add Files">
                    <client-only>
                        <Dropzone :afterUpload="uploadHardwareFile" :acceptedFiles="hardwarefiles.propsOptions?.s3file">
                        </Dropzone>
                    </client-only>
                </FieldsetItem>

                <FieldsetItem v-if="showAddComment" name="Add Comment">
                    <VForm :send="() => hardwareremarks.create()">
                        <div class="grid">

                            <div class="col-8">
                                <div class="mb-4">
                                    <FormInput name="description" type="markdown"
                                        v-model="hardwareremarks.new.description" required label="Comment" />
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
                                        placeholder="Your initials" required label="Submitted By" />
                                </div>
                                <div class="mb-4">
                                    <FormInput name="resolutionMinutes" type="number" append="minutes"
                                        v-model="hardwareremarks.new.resolutionMinutes" label="Time Spent" />
                                </div>
                                <div>
                                    <Button type="submit" class="w-auto" severity="success">
                                        <i class="pi pi-plus mr-1"></i> Add Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </VForm>
                </FieldsetItem>

                <FieldsetItem name="Files" v-if="hardwarefiles.records.length > 0">
                    <HardwareTicketFile v-for="file in hardwarefiles.records" :key="file.props.id" :mFile="file" />
                </FieldsetItem>

                <FieldsetItem name="Comments" v-if="hardwareremarks.records.length > 0">

                    <HardwareTicketRemark v-for="remark in hardwareremarks.records" :key="remark.props?.id"
                        :remark="remark" />

                </FieldsetItem>
                <FieldsetItem name="Statistics">
                    <div><b>Item</b>: {{ hardwareticket.related?.item?.props?.name }}
                        <CopyToClipboard size="xs" :text="hardwareticket.props?.hardwareItemId" />
                    </div>
                    <div><b>Task</b>: {{ hardwareticket.related?.task?.props?.description }}
                        <CopyToClipboard size="xs" :text="hardwareticket.props?.hardwareTaskId" />
                    </div>
                    <div><b>Type</b>: {{ enum2label(hardwareticket.props?.type, hardwareticket.options?.type) }}</div>

                    <div><b>Priority</b>: {{ hardwareticket.props?.priority }}
                    </div>

                    <div><b>Severity</b>: {{ enum2label(hardwareticket.props?.severity,
                        hardwareticket.options?.severity) }}
                    </div>

                    <div><b>Status</b>: {{ enum2label(hardwareticket.props?.status, hardwareticket.options?.status) }}
                    </div>

                    <div><b>Resolution Time</b>: {{ hardwareticket.props?.resolutionMinutes }} minutes</div>

                    <div><b>Submitted By</b>: {{ hardwareticket.props?.submittedBy }}</div>

                    <div><b>Id</b>: {{ hardwareticket.props?.id }}
                        <CopyToClipboard size="xs" :text="hardwareticket.props?.id" />
                    </div>

                    <div><b>Created At</b>: {{ formatDateTime(hardwareticket.props?.createdAt) }}</div>

                    <div><b>Updated At</b>: {{ formatDateTime(hardwareticket.props?.updatedAt) }}</div>
                </FieldsetItem>
            </FieldsetNav>
        </template>

    </PanelFrame>
</template>

<script setup>
definePageMeta({
    middleware: ['auth', 'maintenance-production-manager', 'all-workaround']
});
const route = useRoute();
const id = route.params.id.toString();
const links = useHardwareLinks();

let showAddFiles = ref(false);
let showAddComment = ref(false);

const hardwareticket = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwaretickets/${id}`,
    query: { includeMeta: true, includeOptions: true, includeRelated: ['item', 'task'] },
    async onDelete() {
        await navigateTo('/hardwaretickets');
    },
});
await hardwareticket.fetch();

const hardwareremarks = useVingKind({
    listApi: hardwareticket.links.remarks.href,
    createApi: `/api/${useRestVersion()}/hardwareticketremarks`,
    query: { includeMeta: true, includeOptions: true, sortBy: 'createdAt', sortOrder: 'desc', },
    newDefaults: { description: '', resolution: 'n_a', resolutionMinutes: 0, submittedBy: '', hardwareTicketId: hardwareticket.props?.id },
    async onCreate() {
        showAddComment.value = false;
        await hardwareticket.fetch();
    },
    async onDelete() {
        await hardwareticket.fetch();
    }
});
const hardwarefiles = useVingKind({
    listApi: hardwareticket.links.files.href,
    createApi: `/api/${useRestVersion()}/hardwareticketfiles`,
    query: { includeMeta: true, includeOptions: true, sortBy: 'createdAt', sortOrder: 'desc', includeRelated: ['s3file'], },
    newDefaults: { s3FileId: '', hardwareTicketId: hardwareticket.props?.id },
    async onCreate() {
        showAddFiles.value = false;
    },
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
