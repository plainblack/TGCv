<template>
    <h1>Maintenance Tickets</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">
        <div class="grid">
            <div class="col">
                <FormInput type="select" :options="[
                    { value: '', label: 'All Types' },
                    ...maintenancetickets.propsOptions?.type
                ]" name="typeFilter" v-model="maintenancetickets.query.type" @change="maintenancetickets.search()">
                </FormInput>
            </div>
            <div class="col">
                <FormInput type="select" :options="[
                    { value: '', label: 'All Items' },
                    ...allmaintenanceitems.recordsAsOptions('props', 'name')
                ]" name="maintenanceItemIdFilter" v-model="maintenancetickets.query.maintenanceItemId"
                    @change="maintenancetickets.search()">
                </FormInput>
            </div>
            <div class="col">
                <FormInput type="select" :options="[
                    { value: '', label: 'All Tasks' },
                    ...allmaintenancetasks.recordsAsOptions('props', 'description')
                ]" name="maintenanceTaskIdFilter" v-model="maintenancetickets.query.maintenanceTaskId"
                    @change="maintenancetickets.search()">
                </FormInput>
            </div>
            <div class="col">
                <FormInput type="select" :options="[
                    { value: '', label: 'Open or closed' },
                    ...maintenancetickets.propsOptions?.status
                ]" name="maintenanceStatusFilter" v-model="maintenancetickets.query.status"
                    @change="maintenancetickets.search()">
                </FormInput>
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
            <Column field="props.type" header="Type" sortable v-if="maintenancetickets.query.type == ''">
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.type, maintenancetickets.propsOptions.type) }}
                </template>
            </Column>
            <Column field="props.description" header="Description">
                <template #body="slotProps">
                    {{ slotProps.data.props.description.slice(0, 60) }}
                </template>
            </Column>
            <Column field="props.maintenanceItemId" header="Maintenance Item" sortable>
                <template #body="slotProps">
                    {{ allmaintenanceitems.find(slotProps.data.props?.maintenanceItemId)?.props?.name }}
                </template>
            </Column>
            <Column field="props.maintenanceTaskId" header="Task" sortable>
                <template #body="slotProps">
                    {{ allmaintenancetasks.find(slotProps.data.props?.maintenanceTaskId)?.props?.description }}
                </template>
            </Column>
            <Column field="props.updatedAt" header="Updated At" sortable>
                <template #body="slotProps">
                    {{ dt.formatDate(slotProps.data.props.updatedAt) }}
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenancetickets" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance Ticket</h2>

        <Form :send="() => maintenancetickets.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto">
                    <MaintenanceItemTaskSelector :target="maintenancetickets" :maintenanceitems="allmaintenanceitems" />

                    <div class="mb-4">
                        <FormInput name="description" type="markdown" v-model="maintenancetickets.new.description"
                            required label="Description" />
                    </div>
                    <div class="mb-4">
                        <FormInput type="select" name="type" :options="maintenancetickets.propsOptions?.type"
                            v-model="maintenancetickets.new.type" label="Type" />
                    </div>
                    <div class="mb-4">
                        <FormInput type="select" name="severity" :options="maintenancetickets.propsOptions?.severity"
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
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', maintenanceTaskId: '', maintenanceItemId: '', type: 'needs_help', status: 'unresolved' },
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