<template>
    <h1>Maintenance Files</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText type="text" placeholder="Maintenance Files" class="w-full"
                v-model="maintenancefiles.query.search" @keydown.enter="maintenancefiles.search()" />
            <Button label="Search" @click="maintenancefiles.search()" />
        </InputGroup>

        <DataTable :value="maintenancefiles.records" stripedRows @sort="(e) => maintenancefiles.sortDataTable(e)">
            
            <Column field="props.id" header="Id" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenancefile/${slotProps.data.props.id}`" v-ripple>
                        {{ slotProps.data.props.id }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="props.createdAt" header="Created At" sortable>
                <template #body="slotProps">
                    {{ dt.formatDateTime(slotProps.data.props.createdAt) }}
                </template>
            </Column>
            <Column field="props.updatedAt" header="Updated At" sortable>
                <template #body="slotProps">
                    {{ dt.formatDateTime(slotProps.data.props.updatedAt) }}
                </template>
            </Column>
            <Column field="props.s3FileId" header="S3 File Id" sortable></Column>
            <Column field="props.maintenanceTicketId" header="Maintenance Ticket Id" sortable></Column>
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenancefile/${slotProps.data.props.id}`" class="mr-2 no-underline">
                        <Button icon="pi pi-eye"  title="View" alt="View Maintenance File" />
                    </NuxtLink>
                    <NuxtLink v-if="slotProps.data.meta?.isOwner" :to="`/maintenancefile/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance File" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner"  title="Delete" alt="Delete Maintenance File" icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenancefiles" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance File</h2>

        <Form :send="() => maintenancefiles.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto p-fluid">
                    
                    <div class="mb-4">
                        <FormInput name="s3FileId" type="text" v-model="maintenancefiles.new.s3FileId" required label="S3 File Id" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceTicketId" type="text" v-model="maintenancefiles.new.maintenanceTicketId" required label="Maintenance Ticket Id" />
                    </div>
                    <div>
                        <Button type="submit" class="w-auto" severity="success">
                        <i class="pi pi-plus mr-1"></i> Create Maintenance File
                        </Button>
                    </div>
                </div>

            </div>
        </Form>
    </div>
</template>

<script setup>
const dt = useDateTime();
const maintenancefiles = useVingKind({
    listApi: `/api/${restVersion()}/maintenancefile`,
    createApi: `/api/${restVersion()}/maintenancefile`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { s3FileId: '', maintenanceTicketId: '' },
});
await Promise.all([
    maintenancefiles.search(),
    maintenancefiles.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => maintenancefiles.dispose());
</script>