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
                            <NuxtLinkRecord :kind="allhardwareitems" :recordId="slotProps.data.props?.hardwareItemId" pageHref="/hardwareitem"></NuxtLinkRecord>
                        </template>
                    </Column>
                    <Column field="props.hardwareTaskId" header="Task" sortable>
                        <template #body="slotProps">
                            {{ allhardwaretasks.find(slotProps.data.props?.hardwareTaskId)?.props?.description
                            }}
                        </template>
                    </Column>
                    <Column field="props.description" header="Description" sortable>
                        <template #body="slotProps">
                            <MarkdownView :text="slotProps.data.props?.description" />
                        </template>
                    </Column>
                    <Column field="props.recurrence" header="Recurs" sortable></Column>
                    <Column field="props.months" header="Months" sortable></Column>
                    <Column field="props.weeks" header="Weeks" sortable></Column>
                    <Column field="props.days" header="Days" sortable></Column>

                    <Column header="Manage">
                        <template #body="slotProps">
                            <NuxtLink v-if="slotProps.data.meta?.isOwner"
                                :to="`/hardwareschedule/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
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
                <Form :send="() => hardwareschedules.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">

                            <div class="mb-4">
                                <FormInput type="select" name="recurrence"
                                    :options="hardwareschedules.propsOptions?.recurrence"
                                    v-model="hardwareschedules.new.recurrence" label="Recurrence" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="months" type="number" v-model="hardwareschedules.new.months"
                                    label="Months" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="weeks" type="number" v-model="hardwareschedules.new.weeks"
                                    label="Weeks" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="days" type="number" v-model="hardwareschedules.new.days"
                                    label="Days" />
                            </div>

                            <HardwareItemTaskSelector :target="hardwareschedules" :hardwareitems="allhardwareitems" />
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
                </Form>
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
    listApi: `/api/${useRestVersion()}/hardwareschedule`,
    createApi: `/api/${useRestVersion()}/hardwareschedule`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', hardwareItemId: '', hardwareId: '', },
    newDefaults: { recurrence: 'monthly', hardwareItemId: '', hardwareTaskId: '', days: 0, months: 0, weeks: 0, description: '', },
});
const allhardwareitems = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareitem`,
    createApi: `/api/${useRestVersion()}/hardwareitem`,
    query: { sortBy: 'name', 'status': '!=backup', },
});

const allhardwaretasks = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwaretask`,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
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
