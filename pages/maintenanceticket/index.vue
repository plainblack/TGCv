<template>
    <h1>Maintenance Tickets</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">
        <div class="grid">
            <div class="col">
                <FormSelect :options="allmaintenanceitems.recordsAsOptions('props', 'name')"
                    name="maintenanceItemIdFilter" v-model="maintenancetickets.query.maintenanceItemId"
                    @change="maintenancetickets.search()">
                    <template #prepend>
                        <option value="">All Items</option>
                    </template>
                </FormSelect>
            </div>
            <div class="col">
                <FormSelect :options="allmaintenancetasks.recordsAsOptions('props', 'description')"
                    name="maintenanceTaskIdFilter" v-model="maintenancetickets.query.maintenanceTaskId"
                    @change="maintenancetickets.search()">
                    <template #prepend>
                        <option value="">All Tasks</option>
                    </template>
                </FormSelect>
            </div>
            <div class="col-6">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-search" />
                    </InputGroupAddon>
                    <InputText type="text" placeholder="Maintenance Tickets" class="w-full"
                        v-model="maintenancetickets.query.search" @keydown.enter="maintenancetickets.search()" />
                    <Button label="Search" @click="maintenancetickets.search()" />
                </InputGroup>
            </div>
        </div>


        <DataTable :value="maintenancetickets.records" stripedRows @sort="(e) => maintenancetickets.sortDataTable(e)">

            <Column field="props.ticketNumber" header="#" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceticket/${slotProps.data.props.id}`" v-ripple>
                        {{ slotProps.data.props.ticketNumber }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="props.type" header="Type" sortable>
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.type, maintenancetickets.propsOptions.type) }}
                </template>
            </Column>
            <Column field="props.submittedBy" header="By" sortable></Column>
            <Column field="props.maintenanceTaskId" header="Task" sortable></Column>
            <Column field="props.maintenanceItemId" header="Item" sortable></Column>
            <Column field="props.updatedAt" header="Updated At" sortable>
                <template #body="slotProps">
                    {{ dt.formatDateTime(slotProps.data.props.updatedAt) }}
                </template>
            </Column>
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceticket/${slotProps.data.props.id}`" class="mr-2 no-underline">
                        <Button icon="pi pi-eye" title="View" alt="View Maintenance Ticket" />
                    </NuxtLink>
                    <NuxtLink v-if="slotProps.data.meta?.isOwner"
                        :to="`/maintenanceticket/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Ticket" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance Ticket"
                        icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenancetickets" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance Ticket</h2>

        <Form :send="() => maintenancetickets.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto p-fluid">
                    <MaintenanceItemTaskSelector :target="maintenancetickets" :maintenanceitems="allmaintenanceitems" />

                    <div class="mb-4">
                        <FormInput name="description" type="textarea" v-model="maintenancetickets.new.description"
                            required label="Description" />
                    </div>
                    <div class="mb-4">
                        <FormSelect name="severity" :options="maintenancetickets.propsOptions?.severity"
                            v-model="maintenancetickets.new.severity" label="Severity" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="submittedBy" type="text" v-model="maintenancetickets.new.submittedBy" required
                            label="Submitted By" />
                    </div>
                    <div>
                        <Button type="submit" class="w-auto" severity="success">
                            <i class="pi pi-plus mr-1"></i> Create Maintenance Ticket
                        </Button>
                    </div>
                </div>

            </div>
        </Form>
    </div>
</template>

<script setup>
const dt = useDateTime();
const maintenancetickets = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceticket`,
    createApi: `/api/${restVersion()}/maintenanceticket`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', maintenanceTaskId: '', maintenanceItemId: '', },
    newDefaults: { description: '', type: 'needs_help', severity: 'working', status: 'unresolved', submittedBy: '', maintenanceTaskId: '', maintenanceItemId: '' },
});
const allmaintenanceitems = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceitem`,
    createApi: `/api/${restVersion()}/maintenanceitem`,
    query: { sortBy: 'name' },
});
const allmaintenancetasks = useVingKind({
    listApi: `/api/${restVersion()}/maintenancetask`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});
await Promise.all([
    maintenancetickets.search(),
    maintenancetickets.fetchPropsOptions(),
    allmaintenanceitems.all(),
    allmaintenancetasks.all(),
]);

onBeforeRouteLeave(() => {
    maintenancetickets.dispose();
    allmaintenanceitems.dispose();
    allmaintenancetasks.dispose();
});
</script>