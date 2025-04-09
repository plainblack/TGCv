<template>
    <Title>{{ `Edit Hardware Ticket ${hardwareticket.meta?.ticketNumber}` }}</Title>
    <PanelFrame section="Tickets" :title="`Edit Ticket ${hardwareticket.meta?.ticketNumber}`">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone :title="`Edit Ticket ${hardwareticket.meta?.ticketNumber}`">

                <FieldsetNav v-if="hardwareticket.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput name="description" type="markdown" v-model="hardwareticket.props.description"
                                required label="Description" @change="hardwareticket.save('description')" />
                        </div>
                        <div class="mb-4">
                            <FormInput type="select" name="type" :options="hardwareticket.options.type"
                                v-model="hardwareticket.props.type" label="Type"
                                @change="hardwareticket.save('type')" />
                        </div>
                        <div class="mb-4">
                            <FormInput type="select" name="severity" :options="hardwareticket.options.severity"
                                v-model="hardwareticket.props.severity" label="Severity"
                                @change="hardwareticket.save('severity')" />
                        </div>
                        <div class="mb-4">
                            <FormInput type="select" name="status" :options="hardwareticket.options.status"
                                v-model="hardwareticket.props.status" label="Status"
                                @change="hardwareticket.save('status')" />
                        </div>
                        <div class="mb-4">
                            <FormInput name="submittedBy" type="text" v-model="hardwareticket.props.submittedBy"
                                required label="Submitted By" @change="hardwareticket.save('submittedBy')" />
                        </div>
                        <div class="mb-4">
                            <FormInput name="claimedBy" type="text" v-model="hardwareticket.props.claimedBy"
                                label="Claimed by" placeholder="Your initials"
                                @change="hardwareticket.save('claimedBy')" />
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ hardwareticket.props?.id }}
                            <CopyToClipboard size="xs" :text="hardwareticket.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(hardwareticket.props?.createdAt) }}
                        </div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(hardwareticket.props?.updatedAt) }}
                        </div>

                        <div class="mb-4"><b>Ticket Number</b>: {{ hardwareticket.meta?.ticketNumber }}</div>

                        <div class="mb-4"><b>Resolution Minutes</b>: {{ hardwareticket.props?.resolutionMinutes }}
                        </div>

                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <NuxtLink :to="`/hardwareticket/${hardwareticket.props?.id}`" class="no-underline">
                            <Button title="View" alt="View Hardware Ticket" class="mr-2 mb-2"><i
                                    class="pi pi-eye mr-1"></i>
                                View</Button>
                        </NuxtLink>
                        <Button @click="hardwareticket.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Hardware Ticket"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    </FieldsetItem>

                </FieldsetNav>
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
definePageMeta({
    middleware: ['auth', 'maintenance-production-manager', 'all-workaround']
});
const route = useRoute();
const notify = useNotify();
const id = route.params.id.toString();
const links = useHardwareLinks();
const hardwareticket = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwaretickets/${id}`,
    createApi: `/api/${useRestVersion()}/hardwaretickets`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Hardware Ticket.');
    },
    async onDelete() {
        await navigateTo('/hardwaretickets');
    },
});
await hardwareticket.fetch()

onBeforeRouteLeave(() => {
    hardwareticket.dispose();
});
</script>
