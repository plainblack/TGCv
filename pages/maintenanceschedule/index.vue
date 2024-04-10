<template>
    <h1>Maintenance Schedules</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText type="text" placeholder="Maintenance Schedules" class="w-full"
                v-model="maintenanceschedules.query.search" @keydown.enter="maintenanceschedules.search()" />
            <Button label="Search" @click="maintenanceschedules.search()" />
        </InputGroup>

        <DataTable :value="maintenanceschedules.records" stripedRows
            @sort="(e) => maintenanceschedules.sortDataTable(e)">

            <Column field="props.id" header="Id" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceschedule/${slotProps.data.props.id}`" v-ripple>
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
            <Column field="props.recurrence" header="Recurrence" sortable>
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.recurrence, maintenanceschedules.propsOptions.recurrence) }}
                </template>
            </Column>
            <Column field="props.months" header="Months" sortable></Column>
            <Column field="props.weeks" header="Weeks" sortable></Column>
            <Column field="props.days" header="Days" sortable></Column>
            <Column field="props.maintenanceItemSetId" header="Maintenance Item Set Id" sortable></Column>
            <Column field="props.maintenanceTaskId" header="Maintenance Task Id" sortable></Column>
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceschedule/${slotProps.data.props.id}`" class="mr-2 no-underline">
                        <Button icon="pi pi-eye" title="View" alt="View Maintenance Schedule" />
                    </NuxtLink>
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
                        <FormInput name="months" type="text" v-model="maintenanceschedules.new.months" label="Months" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="weeks" type="text" v-model="maintenanceschedules.new.weeks" label="Weeks" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="days" type="text" v-model="maintenanceschedules.new.days" label="Days" />
                    </div>

                    <div class="mb-4">
                        <FormSelect :options="vingOptionize(maintenanceitems, 'name')" name="maintenanceItemId"
                            v-model="maintenanceschedules.new.maintenanceItemId" label="Equipment"
                            @change="updateMaintenanceTasks">
                        </FormSelect>
                    </div>
                    <div class="mb-4">
                        <FormSelect :options="vingOptionize(maintenancetasks, 'description')" name="maintenanceTaskId"
                            v-model="maintenanceschedules.new.maintenanceTaskId" label="Maintenance Task">
                        </FormSelect>
                    </div>
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
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { recurrence: 'monthly', maintenanceItemId: '', maintenanceTaskId: '', days: '', months: '', weeks: '', },
});
const maintenanceitems = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceitem`,
    createApi: `/api/${restVersion()}/maintenanceitem`,
    query: { sortBy: 'name' },
});
const maintenancetasks = useVingKind({
    listApi: `/api/${restVersion()}/maintenancetask`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { sortBy: 'description' },
});
await Promise.all([
    maintenanceschedules.search(),
    maintenanceschedules.fetchPropsOptions(),
    maintenanceitems.all(),
]);
onBeforeRouteLeave(() => maintenanceschedules.dispose());
const vingOptionize = (vingKind, field) => {
    const options = vingKind.records.map((record) => {
        return { label: record.props[field], value: record.props.id, }
    });
    console.log(options);
    return options;
};

const updateMaintenanceTasks = (async () => {
    const item = maintenanceitems.records.find((item) => { return item.props.id == maintenanceschedules.new.maintenanceItemId });
    maintenancetasks.query.maintenanceItemSetId = item.props.maintenanceItemSetId;
    await maintenancetasks.reset().all();
});

</script>