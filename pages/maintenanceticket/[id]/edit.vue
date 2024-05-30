<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Ticket</h1>

    <FieldsetNav v-if="maintenanceticket.props">
        <FieldsetItem name="Properties">

            <div class="mb-4">
                <FormInput name="description" type="markdown" v-model="maintenanceticket.props.description" required
                    label="Description" @change="maintenanceticket.save('description')" />
            </div>
            <div class="mb-4">
                <FormInput type="select" name="type" :options="maintenanceticket.options?.type"
                    v-model="maintenanceticket.props.type" label="Type" @change="maintenanceticket.save('type')" />
            </div>
            <div class="mb-4">
                <FormInput type="select" name="severity" :options="maintenanceticket.options?.severity"
                    v-model="maintenanceticket.props.severity" label="Severity"
                    @change="maintenanceticket.save('severity')" />
            </div>
            <div class="mb-4">
                <FormInput type="select" name="status" :options="maintenanceticket.options?.status"
                    v-model="maintenanceticket.props.status" label="Status"
                    @change="maintenanceticket.save('status')" />
            </div>
            <div class="mb-4">
                <FormInput name="submittedBy" type="text" v-model="maintenanceticket.props.submittedBy" required
                    label="Submitted By" @change="maintenanceticket.save('submittedBy')" />
            </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">

            <div class="mb-4"><b>Id</b>: {{ maintenanceticket.props?.id }}
                <CopyToClipboard size="xs" :text="maintenanceticket.props?.id" />
            </div>

            <div class="mb-4"><b>Created At</b>: {{ dt.formatDateTime(maintenanceticket.props.createdAt) }}</div>

            <div class="mb-4"><b>Updated At</b>: {{ dt.formatDateTime(maintenanceticket.props.updatedAt) }}</div>

            <div class="mb-4"><b>Ticket Number</b>: {{ maintenanceticket.props?.ticketNumber }}</div>

            <div class="mb-4"><b>Resolution Minutes</b>: {{ maintenanceticket.props?.resolutionMinutes }}</div>

        </FieldsetItem>

        <FieldsetItem name="Actions">
            <NuxtLink :to="`/maintenanceticket/${maintenanceticket.props?.id}`" class="no-underline">
                <Button title="View" alt="View Maintenance Ticket" class="mr-2 mb-2"><i class="pi pi-eye mr-1"></i>
                    View</Button>
            </NuxtLink>
            <Button @click="maintenanceticket.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                alt="Delete Maintenance Ticket"><i class="pi pi-trash mr-1"></i> Delete</Button>
        </FieldsetItem>

    </FieldsetNav>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const dt = useDateTime();
const notify = useNotify();
const id = route.params.id.toString();
const maintenanceticket = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceticket/${id}`,
    createApi: `/api/${restVersion()}/maintenanceticket`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Maintenance Ticket.');
    },
    async onDelete() {
        await navigateTo('/maintenanceticket');
    },
});
await maintenanceticket.fetch()

const breadcrumbs = [
    { label: 'Maintenance Tickets', to: '/maintenanceticket' },
    { label: 'View', to: '/maintenanceticket/' + maintenanceticket.props.id },
    { label: 'Edit' },
];

onBeforeRouteLeave(() => {
    maintenanceticket.dispose();
});
</script>