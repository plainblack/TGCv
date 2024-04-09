<template>
    <h1>Maintenance Tasks</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText type="text" placeholder="Maintenance Tasks" class="w-full"
                v-model="maintenancetasks.query.search" @keydown.enter="maintenancetasks.search()" />
            <Button label="Search" @click="maintenancetasks.search()" />
        </InputGroup>

        <DataTable :value="maintenancetasks.records" stripedRows @sort="(e) => maintenancetasks.sortDataTable(e)">
            
            <Column field="props.id" header="Id" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenancetask/${slotProps.data.props.id}`" v-ripple>
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
            <Column field="props.description" header="Description" sortable></Column>
            <Column field="props.maintenanceItemSetId" header="Maintenance Item Set Id" sortable></Column>
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenancetask/${slotProps.data.props.id}`" class="mr-2 no-underline">
                        <Button icon="pi pi-eye"  title="View" alt="View Maintenance Task" />
                    </NuxtLink>
                    <NuxtLink v-if="slotProps.data.meta?.isOwner" :to="`/maintenancetask/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Task" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner"  title="Delete" alt="Delete Maintenance Task" icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenancetasks" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance Task</h2>

        <Form :send="() => maintenancetasks.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto p-fluid">
                    
                    <div class="mb-4">
                        <FormInput name="description" type="text" v-model="maintenancetasks.new.description" required label="Description" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceItemSetId" type="text" v-model="maintenancetasks.new.maintenanceItemSetId" required label="Maintenance Item Set Id" />
                    </div>
                    <div>
                        <Button type="submit" class="w-auto" severity="success">
                        <i class="pi pi-plus mr-1"></i> Create Maintenance Task
                        </Button>
                    </div>
                </div>

            </div>
        </Form>
    </div>
</template>

<script setup>
const dt = useDateTime();
const maintenancetasks = useVingKind({
    listApi: `/api/${restVersion()}/maintenancetask`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { description: '', maintenanceItemSetId: '' },
});
await Promise.all([
    maintenancetasks.search(),
    maintenancetasks.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => maintenancetasks.dispose());
</script>