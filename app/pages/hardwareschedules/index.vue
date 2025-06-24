<template>
    <Title>Hardware Schedules</Title>

    <PanelFrame section="Schedules" title="Hardware Schedules">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone title="Current Schedules">

                <div class="grid grid-cols-2">
                    <div>
                        <FormInput type="select" :options="allhardwareitems.recordsAsOptions('props', 'name')"
                            placeholder="All Equipment" name="hardwareItemIdFilter"
                            v-model="hardwareschedules.query.hardwareItemId" @change="hardwareschedules.search()">

                        </FormInput>
                    </div>
                    <div>
                        <FormInput type="select" :options="allhardwaretasks.recordsAsOptions('props', 'description')"
                            placeholder="All Tasks" name="hardwareTaskIdFilter"
                            v-model="hardwareschedules.query.hardwareTaskId" @change="hardwareschedules.search()">
                        </FormInput>
                    </div>
                </div>
                <DataTable :value="hardwareschedules.records" stripedRows
                    @sort="(e) => hardwareschedules.sortDataTable(e)">

                    <Column field="props.hardwareItemId" header="Hardware Item" sortable>
                        <template #body="slotProps">
                            <NuxtLinkRecord :kind="allhardwareitems" :recordId="slotProps.data.props?.hardwareItemId"
                                pageHref="/hardwareitems"></NuxtLinkRecord>
                        </template>
                    </Column>
                    <Column field="props.ticketPriority" header="Priority" sortable />
                    <Column field="props.hardwareTaskId" header="Task" sortable>
                        <template #body="slotProps">
                            {{ allhardwaretasks.find(slotProps.data.props?.hardwareTaskId)?.props?.description
                            }}
                        </template>
                    </Column>
                    <Column field="props.description" header="Description" sortable>
                        <template #body="slotProps">
                            <client-only><MarkdownView :text="slotProps.data.props?.description" /></client-only>
                        </template>
                    </Column>
                    <Column field="props.schedule" header="Schedule"></Column>

                    <Column header="Manage">
                        <template #body="slotProps">
                            <NuxtLink v-if="slotProps.data.meta?.isOwner" :to="slotProps.data.links.edit.href"
                                class="mr-2 no-underline">
                                <Button icon="pi pi-pencil" severity="success" title="Edit"
                                    alt="Edit Hardware Schedule" />
                            </NuxtLink>
                            <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Hardware Schedule"
                                icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                        </template>
                    </Column>
                </DataTable>
                <Pager :kind="hardwareschedules" />
            </PanelZone>
            <PanelZone title="Create Hardware Schedule">
                <VForm :send="() => hardwareschedules.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">
                            <div class="mb-4">
                                <FormInput name="schedule" type="text" required v-model="hardwareschedules.new.schedule"
                                    label="Schedule" />
                            </div>
                            <HardwareItemTaskSelector :target="hardwareschedules" :hardwareitems="allhardwareitems" />
                            <div class="mb-4">
                                <FormInput name="ticketPriority" type="number" required v-model="hardwareschedules.new.ticketPriority"
                                    label="Priority" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="description" type="markdown"
                                    v-model="hardwareschedules.new.description" required label="Description" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Hardware Schedule
                                </Button>
                            </div>
                        </div>
                    </div>
                </VForm>
                <HardwareScheduleExamples />
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
definePageMeta({
    middleware: ['auth', 'maintenance-manager', 'all-workaround']
});
const hardwareschedules = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareschedules`,
    createApi: `/api/${useRestVersion()}/hardwareschedules`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', hardwareItemId: '', hardwareId: '', },
    newDefaults: { schedule: '1 10 * * *', ticketPriority: 3, hardwareItemId: '', hardwareTaskId: '', description: '', },
});
const allhardwareitems = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareitems`,
    createApi: `/api/${useRestVersion()}/hardwareitems`,
    query: { sortBy: 'name', 'status': '!=backup', },
});

const allhardwaretasks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwaretasks`,
    createApi: `/api/${useRestVersion()}/hardwaretasks`,
    query: { sortBy: 'description' },
});

const links = useHardwareLinks();
await Promise.all([
    hardwareschedules.search(),
    hardwareschedules.fetchPropsOptions(),
    allhardwareitems.all(),
    allhardwaretasks.all(),
]);
onBeforeRouteLeave(() => {
    hardwareschedules.dispose();
    allhardwareitems.dispose();
    allhardwaretasks.dispose();
});

</script>
