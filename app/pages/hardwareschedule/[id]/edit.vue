<template>
    <Title>Edit Hardware Schedule</Title>

    <PanelFrame section="Hardware" title="Edit Hardware Schedule">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>

                <FieldsetNav v-if="hardwareschedule.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput type="select" name="recurrence" :options="hardwareschedule.options?.recurrence"
                                v-model="hardwareschedule.props.recurrence" label="Recurrence"
                                @change="hardwareschedule.save('recurrence')" />
                        </div>
                        <div class="mb-4">
                            <FormInput name="months" type="number" v-model="hardwareschedule.props.months"
                                label="Months" @change="hardwareschedule.save('months')" />
                        </div>
                        <div class="mb-4">
                            <FormInput name="weeks" type="number" v-model="hardwareschedule.props.weeks" label="Weeks"
                                @change="hardwareschedule.save('weeks')" />
                        </div>
                        <div class="mb-4">
                            <FormInput name="days" type="number" v-model="hardwareschedule.props.days" label="Days"
                                @change="hardwareschedule.save('days')" />
                        </div>
                        <HardwareItemTaskSelectorEdit :target="hardwareschedule" :taskFilter="{ status : '!=backup', }"/>
                        <div class="mb-4">
                            <FormInput name="description" type="markdown" v-model="hardwareschedule.props.description"
                                required label="Description" @change="hardwareschedule.save('description')" />
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ hardwareschedule.props?.id }}
                            <CopyToClipboard size="xs" :text="hardwareschedule.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(hardwareschedule.props?.createdAt) }}
                        </div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(hardwareschedule.props?.updatedAt) }}
                        </div>

                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <NuxtLink :to="`/hardwareschedule/${hardwareschedule.props?.id}`" class="no-underline">
                            <Button title="View" alt="View Hardware Schedule" class="mr-2 mb-2"><i
                                    class="pi pi-eye mr-1"></i>
                                View</Button>
                        </NuxtLink>
                        <Button @click="hardwareschedule.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Hardware Schedule"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    </FieldsetItem>

                    <FieldsetItem name="Examples">
                        <HardwareScheduleExamples />
                    </FieldsetItem>
                </FieldsetNav>
        </template>
    </PanelFrame>

</template>

<script setup>
definePageMeta({
    middleware: ['auth', 'maintenance-manager']
});
const route = useRoute();
const notify = useNotify();
const id = route.params.id.toString();
const links = useHardwareLinks();

const hardwareschedule = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwareschedule/${id}`,
    createApi: `/api/${useRestVersion()}/hardwareschedule`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Hardware Schedule.');
    },
    async onDelete() {
        await navigateTo('/hardwareschedule');
    },
});
await hardwareschedule.fetch()

onBeforeRouteLeave(() => {
    hardwareschedule.dispose();
});
</script>