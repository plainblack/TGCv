<template>

    <Title>Maintenance Files</Title>
    <PanelFrame section="Files" title="Hardware Files">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone title="Hardware Files">

                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-search" />
                    </InputGroupAddon>
                    <InputText type="text" placeholder="Hardware Files" class="w-full"
                        v-model="maintenancefiles.query.search" @keydown.enter="maintenancefiles.search()" />
                    <Button label="Search" @click="maintenancefiles.search()" />
                </InputGroup>

                <DataTable :value="maintenancefiles.records" stripedRows
                    @sort="(e) => maintenancefiles.sortDataTable(e)">

                    <Column field="props.id" header="Id" sortable>
                        <template #body="slotProps">
                            <NuxtLink :to="`/maintenancefile/${slotProps.data.props.id}`" v-ripple>
                                {{ slotProps.data.props.id }}
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column field="props.createdAt" header="Created At" sortable>
                        <template #body="slotProps">
                            {{ formatDateTime(slotProps.data.props.createdAt) }}
                        </template>
                    </Column>
                    <Column field="props.updatedAt" header="Updated At" sortable>
                        <template #body="slotProps">
                            {{ formatDateTime(slotProps.data.props.updatedAt) }}
                        </template>
                    </Column>
                    <Column field="props.s3FileId" header="S3 File Id" sortable></Column>
                    <Column field="props.maintenanceTicketId" header="Maintenance Ticket Id" sortable></Column>
                    <Column header="Manage">
                        <template #body="slotProps">
                            <NuxtLink :to="`/maintenancefile/${slotProps.data.props.id}`" class="mr-2 no-underline">
                                <Button icon="pi pi-eye" title="View" alt="View Maintenance File" />
                            </NuxtLink>
                            <NuxtLink v-if="slotProps.data.meta?.isOwner"
                                :to="`/maintenancefile/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                                <Button icon="pi pi-pencil" severity="success" title="Edit"
                                    alt="Edit Maintenance File" />
                            </NuxtLink>
                            <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance File"
                                icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                        </template>
                    </Column>
                </DataTable>
                <Pager :kind="maintenancefiles" />
            </PanelZone>
            <PanelZone title="Create Hardware File">
                <Form :send="() => maintenancefiles.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">

                            <div class="mb-4">
                                <FormInput name="s3FileId" type="text" v-model="maintenancefiles.new.s3FileId" required
                                    label="S3 File Id" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="maintenanceTicketId" type="text"
                                    v-model="maintenancefiles.new.maintenanceTicketId" required
                                    label="Maintenance Ticket Id" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Hardware File
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
const maintenancefiles = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenancefile`,
    createApi: `/api/${useRestVersion()}/maintenancefile`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { s3FileId: '', maintenanceTicketId: '' },
});
const links = useMaintenanceLinks();
await Promise.all([
    maintenancefiles.search(),
    maintenancefiles.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => maintenancefiles.dispose());
</script>
