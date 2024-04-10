<template>
    <h1>Maintenance Tickets</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText type="text" placeholder="Maintenance Tickets" class="w-full"
                v-model="maintenancetickets.query.search" @keydown.enter="maintenancetickets.search()" />
            <Button label="Search" @click="maintenancetickets.search()" />
        </InputGroup>

        <DataTable :value="maintenancetickets.records" stripedRows @sort="(e) => maintenancetickets.sortDataTable(e)">
            
            <Column field="props.id" header="Id" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceticket/${slotProps.data.props.id}`" v-ripple>
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
            <Column field="props.name" header="Name" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceticket/${slotProps.data.props.id}`" v-ripple>
                        {{ slotProps.data.props.name }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="props.ticketNumber" header="Ticket Number" sortable></Column>
            <Column field="props.description" header="Description" sortable></Column>
            <Column field="props.type" header="Type" sortable>
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.type, maintenancetickets.propsOptions.type) }}
                </template>
            </Column>
            <Column field="props.severity" header="Severity" sortable>
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.severity, maintenancetickets.propsOptions.severity) }}
                </template>
            </Column>
            <Column field="props.status" header="Status" sortable>
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.status, maintenancetickets.propsOptions.status) }}
                </template>
            </Column>
            <Column field="props.resolutionMinutes" header="Resolution Minutes" sortable></Column>
            <Column field="props.submittedBy" header="Submitted By" sortable></Column>
            <Column field="props.maintenanceTaskId" header="Maintenance Task Id" sortable></Column>
            <Column field="props.maintenanceItemId" header="Maintenance Item Id" sortable></Column>
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceticket/${slotProps.data.props.id}`" class="mr-2 no-underline">
                        <Button icon="pi pi-eye"  title="View" alt="View Maintenance Ticket" />
                    </NuxtLink>
                    <NuxtLink v-if="slotProps.data.meta?.isOwner" :to="`/maintenanceticket/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Ticket" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner"  title="Delete" alt="Delete Maintenance Ticket" icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
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
                    
                    <div class="mb-4">
                        <FormInput name="name" type="text" v-model="maintenancetickets.new.name" required label="Name" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="description" type="text" v-model="maintenancetickets.new.description" required label="Description" />
                    </div>
                    <div class="mb-4">
                        <FormSelect name="type" :options="maintenancetickets.propsOptions?.type" v-model="maintenancetickets.new.type" label="Type" />
                    </div>
                    <div class="mb-4">
                        <FormSelect name="severity" :options="maintenancetickets.propsOptions?.severity" v-model="maintenancetickets.new.severity" label="Severity" />
                    </div>
                    <div class="mb-4">
                        <FormSelect name="status" :options="maintenancetickets.propsOptions?.status" v-model="maintenancetickets.new.status" label="Status" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="submittedBy" type="text" v-model="maintenancetickets.new.submittedBy" required label="Submitted By" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceTaskId" type="text" v-model="maintenancetickets.new.maintenanceTaskId" required label="Maintenance Task Id" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceItemId" type="text" v-model="maintenancetickets.new.maintenanceItemId" required label="Maintenance Item Id" />
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
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { name: '', description: '', type: 'routine', severity: 'working', status: 'resolved', submittedBy: '', maintenanceTaskId: '', maintenanceItemId: '' },
});
await Promise.all([
    maintenancetickets.search(),
    maintenancetickets.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => maintenancetickets.dispose());
</script>