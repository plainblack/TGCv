<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Schedule</h1>

    <FieldsetNav v-if="maintenanceschedule.props">
        <FieldsetItem name="Properties">

            <div class="mb-4">
                <FormInput type="select" name="recurrence" :options="maintenanceschedule.options?.recurrence"
                    v-model="maintenanceschedule.props.recurrence" label="Recurrence"
                    @change="maintenanceschedule.save('recurrence')" />
            </div>
            <div class="mb-4">
                <FormInput name="months" type="number" v-model="maintenanceschedule.props.months" label="Months"
                    @change="maintenanceschedule.save('months')" />
            </div>
            <div class="mb-4">
                <FormInput name="weeks" type="number" v-model="maintenanceschedule.props.weeks" label="Weeks"
                    @change="maintenanceschedule.save('weeks')" />
            </div>
            <div class="mb-4">
                <FormInput name="days" type="number" v-model="maintenanceschedule.props.days" label="Days"
                    @change="maintenanceschedule.save('days')" />
            </div>
            <MaintenanceItemTaskSelectorEdit :target="maintenanceschedule" />
            <div class="mb-4">
                <FormInput name="description" type="markdown" v-model="maintenanceschedule.props.description" required
                    label="Description" @change="maintenanceschedule.save('description')" />
            </div>
        </FieldsetItem>

        <FieldsetItem name="Statistics">

            <div class="mb-4"><b>Id</b>: {{ maintenanceschedule.props?.id }}
                <CopyToClipboard size="xs" :text="maintenanceschedule.props?.id" />
            </div>

            <div class="mb-4"><b>Created At</b>: {{ dt.formatDateTime(maintenanceschedule.props?.createdAt) }}</div>

            <div class="mb-4"><b>Updated At</b>: {{ dt.formatDateTime(maintenanceschedule.props?.updatedAt) }}</div>

        </FieldsetItem>

        <FieldsetItem name="Actions">
            <NuxtLink :to="`/maintenanceschedule/${maintenanceschedule.props?.id}`" class="no-underline">
                <Button title="View" alt="View Maintenance Schedule" class="mr-2 mb-2"><i class="pi pi-eye mr-1"></i>
                    View</Button>
            </NuxtLink>
            <Button @click="maintenanceschedule.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                alt="Delete Maintenance Schedule"><i class="pi pi-trash mr-1"></i> Delete</Button>
        </FieldsetItem>

    </FieldsetNav>
    <MaintenanceScheduleExamples />

</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const dt = useDateTime();
const notify = useNotifyStore();
const id = route.params.id.toString();
const maintenanceschedule = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceschedule/${id}`,
    createApi: `/api/${restVersion()}/maintenanceschedule`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Maintenance Schedule.');
    },
    async onDelete() {
        await navigateTo('/maintenanceschedule');
    },
});
await maintenanceschedule.fetch()

const breadcrumbs = [
    { label: 'Maintenance Schedules', to: '/maintenanceschedule' },
    { label: 'Edit' },
];
onBeforeRouteLeave(() => {
    maintenanceschedule.dispose();
});
</script>