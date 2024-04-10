<template>
    <h1>Maintenance Schedules</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">
        <div class="grid">
            <div class="col">
                <FormSelect :options="allmaintenanceitems.recordsAsOptions('props', 'name')"
                    name="maintenanceItemIdFilter" v-model="maintenanceschedules.query.maintenanceItemId"
                    @change="maintenanceschedules.search()">
                    <template #prepend>
                        <option value="">All Items</option>
                    </template>
                </FormSelect>
            </div>
            <div class="col">
                <FormSelect :options="allmaintenancetasks.recordsAsOptions('props', 'description')"
                    name="maintenanceTaskIdFilter" v-model="maintenanceschedules.query.maintenanceTaskId"
                    @change="maintenanceschedules.search()">
                    <template #prepend>
                        <option value="">All Tasks</option>
                    </template>
                </FormSelect>
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
                    {{ allmaintenancetasks.find(slotProps.data.props?.maintenanceTaskId)?.props?.description }}
                </template>
            </Column>
            <Column field="props.months" header="Months" sortable></Column>
            <Column field="props.weeks" header="Weeks" sortable></Column>
            <Column field="props.days" header="Days" sortable></Column>

            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink v-if="slotProps.data.meta?.isOwner"
                        :to="`/maintenanceschedule/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Schedule" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance Schedule"
                        icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenanceschedules" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance Schedule</h2>

        <Form :send="() => maintenanceschedules.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto p-fluid">

                    <div class="mb-4">
                        <FormSelect name="recurrence" :options="maintenanceschedules.propsOptions?.recurrence"
                            v-model="maintenanceschedules.new.recurrence" label="Recurrence" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="months" type="number" v-model="maintenanceschedules.new.months"
                            label="Months" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="weeks" type="number" v-model="maintenanceschedules.new.weeks" label="Weeks" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="days" type="number" v-model="maintenanceschedules.new.days" label="Days" />
                    </div>

                    <MaintenanceItemTaskSelector :target="maintenanceschedules"
                        :maintenanceitems="allmaintenanceitems" />
                    <div>
                        <Button type="submit" class="w-auto" severity="success">
                            <i class="pi pi-plus mr-1"></i> Create Maintenance Schedule
                        </Button>
                    </div>
                </div>

            </div>
        </Form>
    </div>
</template>

<script setup>
const dt = useDateTime();
const maintenanceschedules = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceschedule`,
    createApi: `/api/${restVersion()}/maintenanceschedule`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', maintenanceItemId: '', maintenanceId: '', },
    newDefaults: { recurrence: 'monthly', maintenanceItemId: '', maintenanceTaskId: '', days: 0, months: 0, weeks: 0, },
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
    maintenanceschedules.search(),
    maintenanceschedules.fetchPropsOptions(),
    allmaintenanceitems.all(),
    allmaintenancetasks.all(),
]);
onBeforeRouteLeave(() => maintenanceschedules.dispose());

</script>