<template>
    <Title>Maintenance Schedules</Title>

    <PanelFrame section="Schedules" title="Maintenance Schedules">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone title="Current Schedules">

                <div class="grid">
                    <div class="col">
                        <FormInput type="select" :options="allmaintenanceitems.recordsAsOptions('props', 'name')"
                        placeholder="All Equipment" name="maintenanceItemIdFilter" v-model="maintenanceschedules.query.maintenanceItemId"
                            @change="maintenanceschedules.search()">

                        </FormInput>
                    </div>
                    <div class="col">
                        <FormInput type="select" :options="allmaintenancetasks.recordsAsOptions('props', 'description')"
                        placeholder="All Tasks" name="maintenanceTaskIdFilter" v-model="maintenanceschedules.query.maintenanceTaskId"
                            @change="maintenanceschedules.search()">
                        </FormInput>
                    </div>
                </div>
                <DataTable :value="maintenanceschedules.records" stripedRows
                    @sort="(e) => maintenanceschedules.sortDataTable(e)">

                    <Column field="props.maintenanceItemId" header="Maintenance Item" sortable>
                        <template #body="slotProps">
                            {{ allmaintenanceitems.find(slotProps.data.props?.maintenanceItemId)?.props?.name }}
                        </template>
                    </Column>
                    <Column field="props.maintenanceTaskId" header="Task" sortable>
                        <template #body="slotProps">
                            {{ allmaintenancetasks.find(slotProps.data.props?.maintenanceTaskId)?.props?.description
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
                                :to="`/maintenanceschedule/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                                <Button icon="pi pi-pencil" severity="success" title="Edit"
                                    alt="Edit Maintenance Schedule" />
                            </NuxtLink>
                            <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance Schedule"
                                icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                        </template>
                    </Column>
                </DataTable>
                <Pager :kind="maintenanceschedules" />
            </PanelZone>
            <PanelZone title="Create Maintenance Schedule">
                <Form :send="() => maintenanceschedules.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">

                            <div class="mb-4">
                                <FormInput type="select" name="recurrence" 
                                    :options="maintenanceschedules.propsOptions?.recurrence"
                                    v-model="maintenanceschedules.new.recurrence" label="Recurrence" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="months" type="number" v-model="maintenanceschedules.new.months"
                                    label="Months" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="weeks" type="number" v-model="maintenanceschedules.new.weeks"
                                    label="Weeks" />
                            </div>
                            <div class="mb-4">
                                <FormInput name="days" type="number" v-model="maintenanceschedules.new.days"
                                    label="Days" />
                            </div>

                            <MaintenanceItemTaskSelector :target="maintenanceschedules"
                                :maintenanceitems="allmaintenanceitems" />
                            <div class="mb-4">
                                <FormInput name="description" type="markdown"
                                    v-model="maintenanceschedules.new.description" required label="Description" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Maintenance Schedule
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
                <MaintenanceScheduleExamples />
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
const maintenanceschedules = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenanceschedule`,
    createApi: `/api/${useRestVersion()}/maintenanceschedule`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', maintenanceItemId: '', maintenanceId: '', },
    newDefaults: { recurrence: 'monthly', maintenanceItemId: '', maintenanceTaskId: '', days: 0, months: 0, weeks: 0, description: '', },
});
const allmaintenanceitems = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenanceitem`,
    createApi: `/api/${useRestVersion()}/maintenanceitem`,
    query: { sortBy: 'name' },
});

const allmaintenancetasks = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenancetask`,
    createApi: `/api/${useRestVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});
const usedmaintenanceitems = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenanceitem`,
    createApi: `/api/${useRestVersion()}/maintenanceitem`,
    query: { sortBy: 'name' },
});

const usedmaintenancetasks = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenancetask`,
    createApi: `/api/${useRestVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});

const links = useMaintenanceLinks();
await Promise.all([
    maintenanceschedules.search(),
    maintenanceschedules.fetchPropsOptions(),
    allmaintenanceitems.all(),
    allmaintenancetasks.all(),
    usedmaintenanceitems.all(),
    usedmaintenancetasks.all(),
]);
onBeforeRouteLeave(() => {
    maintenanceschedules.dispose();
    allmaintenanceitems.dispose();
    allmaintenancetasks.dispose();
    usedmaintenanceitems.dispose();
    usedmaintenancetasks.dispose();
});

</script>
