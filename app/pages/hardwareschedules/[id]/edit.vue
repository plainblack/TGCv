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
                        <FormInput name="schedule" type="text" v-model="hardwareschedule.props.schedule"
                            label="Schedule" @change="hardwareschedule.save('schedule')" />
                        <CronToHuman :schedule="hardwareschedule.props.schedule" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="ticketPriority" type="number" v-model="hardwareschedule.props.ticketPriority"
                            label="Priority" @change="hardwareschedule.save('ticketPriority')" />
                    </div>
                    <HardwareItemTaskSelectorEdit :target="hardwareschedule" :taskFilter="{ status: '!=backup', }" />
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
    middleware: ['auth', 'maintenance-manager', 'all-workaround']
});
const route = useRoute();
const notify = useNotify();
const id = route.params.id.toString();
const links = useHardwareLinks();

const hardwareschedule = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwareschedules/${id}`,
    createApi: `/api/${useRestVersion()}/hardwareschedules`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Hardware Schedule.');
    },
    async onDelete() {
        await navigateTo('/hardwareschedules');
    },
});
await hardwareschedule.fetch()

onBeforeRouteLeave(() => {
    hardwareschedule.dispose();
});
</script>