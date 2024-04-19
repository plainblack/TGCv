<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance File</h1>

    <FieldsetNav v-if="maintenancefile.props">
        <FieldsetItem name="Properties">
            
                    <div class="mb-4">
                        <client-only>
                            <Dropzone :acceptedFiles="['.png', '.jpg', '.gif']" :afterUpload="(s3file) => maintenancefile.importS3File('s3file', s3file.props?.id)"
                                :maxFiles="1" :resizeHeight="300" :resizeWidth="300" resizeMethod="crop"></Dropzone>
                        </client-only>
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceTicketId" type="text" v-model="maintenancefile.props.maintenanceTicketId" required label="Maintenance Ticket Id" @change="maintenancefile.update()" />
                    </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">
            
                <div class="mb-4"><b>Id</b>: {{maintenancefile.props?.id}} <CopyToClipboard :text="maintenancefile.props?.id" /></div>
                
            <div class="mb-4"><b>Created At</b>: {{dt.formatDateTime(maintenancefile.props.createdAt)}}</div>
            
            <div class="mb-4"><b>Updated At</b>: {{dt.formatDateTime(maintenancefile.props.updatedAt)}}</div>
            
        </FieldsetItem>

        <FieldsetItem name="Actions">
            <NuxtLink :to="`/maintenancefile/${maintenancefile.props?.id}`" class="no-underline">
                <Button title="View" alt="View Maintenance File" class="mr-2 mb-2"><i class="pi pi-eye mr-1"></i> View</Button>
            </NuxtLink>
            <Button @click="maintenancefile.delete()" severity="danger" class="mr-2 mb-2" title="Delete" alt="Delete Maintenance File"><i class="pi pi-trash mr-1"></i> Delete</Button>
        </FieldsetItem>

    </FieldsetNav>
</template>
  
<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const dt = useDateTime();
const notify = useNotifyStore();
const id = route.params.id.toString();
const maintenancefile = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenancefile/${id}`,
    createApi: `/api/${restVersion()}/maintenancefile`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Maintenance File.');
    },
    async onDelete() {
        await navigateTo('/maintenancefile');
    },
});
await maintenancefile.fetch()
onBeforeRouteLeave(() => maintenancefile.dispose());

const breadcrumbs = [
    { label: 'Maintenance Files', to: '/maintenancefile' },
    { label: 'View', to: '/maintenancefile/'+maintenancefile.props.id },
    { label: 'Edit' },
];
</script>