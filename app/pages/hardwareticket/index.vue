<template>
    <Title>Hardware Tickets</Title>
    <PanelFrame section="Tickets" title="Hardware Tickets">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone title="Tickets">
                <div class="grid">
                    <div class="col">
                        <FormInput type="select" :options="hardwaretickets.propsOptions?.type" name="typeFilter"
                            v-model="hardwaretickets.query.type" placeholder="All Types"
                            @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div class="col">
                        <FormInput type="select" :options="allhardwareitems.recordsAsOptions('props', 'name')"
                            name="hardwareItemIdFilter" placeholder="All Equipment"
                            v-model="hardwaretickets.query.hardwareItemId" @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div class="col">
                        <FormInput type="select" :options="allhardwaretasks.recordsAsOptions('props', 'description')"
                            name="hardwareTaskIdFilter" placeholder="All Tasks"
                            v-model="hardwaretickets.query.hardwareTaskId" @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div class="col">
                        <FormInput type="select" :options="hardwaretickets.propsOptions?.status"
                            name="hardwareStatusFilter" placeholder="Open or Closed"
                            v-model="hardwaretickets.query.status" @change="hardwaretickets.search()">
                        </FormInput>
                    </div>
                    <div class="col-6">
                        <InputGroup>
                            <InputGroupAddon>
                                <i class="pi pi-search" />
                            </InputGroupAddon>
                            <InputText type="text" placeholder="Hardware Tickets" class="w-full"
                                v-model="hardwaretickets.query.search" @keydown.enter="hardwaretickets.search()" />
                            <Button label="Search" @click="hardwaretickets.search()" />
                        </InputGroup>
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
                            {{ slotProps.data.props.description.slice(0, 60) }}
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
                    <Column field="props.updatedAt" header="Updated At" sortable>
                        <template #body="slotProps">
                            {{ formatDate(slotProps.data.props.updatedAt) }}
                        </template>
                    </Column>
                </DataTable>
                <Pager :kind="hardwaretickets" />
            </PanelZone>
            <PanelZone title="Create Hardware Ticket">
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
                                    required label="Submitted By" />
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
    middleware: ['auth']
});
const hardwaretickets = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareticket`,
    createApi: `/api/${useRestVersion()}/hardwareticket`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', hardwareTaskId: '', hardwareItemId: '', type: 'needs_help', status: 'unresolved' },
    newDefaults: { description: '', type: 'needs_help', severity: 'working', status: 'unresolved', submittedBy: 'Your name/initials', hardwareTaskId: '', hardwareItemId: '' },
    onCreate: (data) => { console.log(data); return navigateTo(`/hardwareticket/${data.props.id}`) },
});
const allhardwareitems = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareitem`,
    createApi: `/api/${useRestVersion()}/hardwareitem`,
    query: { sortBy: 'name' },
});
const allhardwaretasks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwaretask`,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
    query: { sortBy: 'description' },
});
const links = useHardwareLinks();

await Promise.all([
    hardwaretickets.search(),
    hardwaretickets.fetchPropsOptions(),
    allhardwareitems.all(),
    allhardwaretasks.all(),
]);

onBeforeRouteLeave(() => {
    hardwaretickets.dispose();
    allhardwareitems.dispose();
    allhardwaretasks.dispose();
});
</script>