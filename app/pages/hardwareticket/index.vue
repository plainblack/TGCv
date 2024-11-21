<template>
    <Title>Hardware Tickets</Title>
    <PanelFrame section="Tickets" title="Hardware Tickets">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone title="Existing Tickets">
                <div class="grid md:grid-cols-5 gap-1 sm:grid-cols-2">
                    <div class="col">
                        <FormInput type="select" :options="hardwaretickets.propsOptions?.type" name="typeFilter"
                            v-model="hardwaretickets.query.type" placeholder="All Types"
                            @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div>
                        <FormInput type="select" :options="allhardwareitems.recordsAsOptions('props', 'name')"
                            name="hardwareItemIdFilter" placeholder="All Equipment"
                            v-model="hardwaretickets.query.hardwareItemId" @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div>
                        <FormInput type="select" :options="hardwaretickets.propsOptions?.status"
                            name="hardwareStatusFilter" placeholder="Any Status" v-model="hardwaretickets.query.status"
                            @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div>
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText type="text" placeholder="Ticket Description" class="w-full"
                                v-model="hardwaretickets.query.search" @keydown.enter="hardwaretickets.search()" />
                            <Button label="Search" @click="hardwaretickets.search()" />
                        </InputGroup>
                    </div>
                    <div>
                        <JumpToTicket />
                    </div>
                </div>


                <DataTable :value="hardwaretickets.records" stripedRows @sort="(e) => hardwaretickets.sortDataTable(e)">

                    <Column field="props.ticketNumber" header="#" sortable>
                        <template #body="slotProps">
                            <NuxtLink :to="`/hardwareticket/${slotProps.data.props.id}`" v-ripple>
                                {{ slotProps.data.meta.ticketNumber }}
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column field="props.type" header="Type" sortable v-if="hardwaretickets.query.type == ''">
                        <template #body="slotProps">
                            {{ enum2label(slotProps.data.props.type, hardwaretickets.propsOptions.type) }}
                        </template>
                    </Column>
                    <Column field="props.description" header="Description">
                        <template #body="slotProps">
                            <NuxtLink :to="`/hardwareticket/${slotProps.data.props.id}`" v-ripple>
                                {{ slotProps.data.props.description.slice(0, 60) }}
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column field="props.hardwareItemId" header="Hardware Item" sortable>
                        <template #body="slotProps">
                            {{ allhardwareitems.find(slotProps.data.props?.hardwareItemId)?.props?.name }}
                        </template>
                    </Column>
                    <Column field="props.hardwareTaskId" header="Task" sortable>
                        <template #body="slotProps">
                            {{ allhardwaretasks.find(slotProps.data.props?.hardwareTaskId)?.props?.description }}
                        </template>
                    </Column>
                    <Column field="props.claimedBy" header="Claimed By"></Column>
                    <Column field="props.updatedAt" header="Updated At" sortable>
                        <template #body="slotProps">
                            {{ formatDate(slotProps.data.props.updatedAt) }}
                        </template>
                    </Column>
                </DataTable>
                <Pager :kind="hardwaretickets" />
            </PanelZone>
            <PanelZone title="Create A Ticket">
                <Form :send="() => hardwaretickets.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">
                            <HardwareItemTaskSelector :target="hardwaretickets" :hardwareitems="allhardwareitems" />

                            <div class="mb-4">
                                <FormInput name="description" type="markdown" v-model="hardwaretickets.new.description"
                                    required label="Description" />
                            </div>
                            <div class="mb-4">
                                <FormInput type="select" name="type" :options="hardwaretickets.propsOptions?.type"
                                    v-model="hardwaretickets.new.type" label="Type" />
                            </div>
                            <div class="mb-4">
                                <FormInput type="select" name="severity"
                                    :options="hardwaretickets.propsOptions?.severity"
                                    v-model="hardwaretickets.new.severity" label="Severity" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="submittedBy" type="text" v-model="hardwaretickets.new.submittedBy"
                                    placeholder="Your Initials" required label="Submitted By" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="status" type="select" v-model="hardwaretickets.new.status"
                                    :options="hardwaretickets.propsOptions?.status" required label="Status" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Hardware Ticket
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
definePageMeta({
    middleware: ['auth', 'maintenance-production-manager', 'all-workaround']
});
const hardwaretickets = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareticket`,
    createApi: `/api/${useRestVersion()}/hardwareticket`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', hardwareTaskId: '', hardwareItemId: '', type: '', status: 'unresolved', description: '' },
    newDefaults: { description: '', type: 'needs_help', severity: 'working', status: 'unresolved', submittedBy: '', hardwareTaskId: '', hardwareItemId: '', id: '' },
    onCreate: (data) => { return navigateTo(`/hardwareticket/${data.props.id}`) },
});
const allhardwareitems = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareitem`,
    createApi: `/api/${useRestVersion()}/hardwareitem`,
    query: { sortBy: 'name', itemsPerPage: 100, },
});
const allhardwaretasks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwaretask`,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
    query: { sortBy: 'description', itemsPerPage: 100, },
});
const links = useHardwareLinks();

await hardwaretickets.search();

await Promise.all([
    hardwaretickets.fetchPropsOptions(),
    allhardwareitems.all(),
    allhardwaretasks.all(),
]);

onBeforeRouteLeave(() => {
    hardwaretickets.dispose();
    allhardwaretasks.dispose(); // throws an error after creating a new ticket if this is disposed
    allhardwareitems.dispose();
});

</script>