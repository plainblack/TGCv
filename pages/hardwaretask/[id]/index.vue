<template>
    <Title>Edit Maintenance Task</Title>

    <PanelFrame section="Maintenance" title="Edit Hardware Task">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone :title="maintenancetask.props.name">

                <FieldsetNav v-if="maintenancetask.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput name="description" type="text" v-model="maintenancetask.props.description"
                                required label="Description" @change="maintenancetask.save('description')" />
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ maintenancetask.props?.id }}
                            <CopyToClipboard size="xs" :text="maintenancetask.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(maintenancetask.props.createdAt) }}</div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(maintenancetask.props.updatedAt) }}</div>
                        <div class="mb-4"><b>Hardware Set</b>: <NuxtLink
                                :to="`/maintenanceitemset/${maintenancetask.props?.maintenanceItemSetId}`">{{
                maintenancetask.related?.itemSet?.props?.name }}</NuxtLink>
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <Button @click="maintenancetask.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Maintenance Task"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    </FieldsetItem>

                </FieldsetNav>
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
import PanelFrame from '~/components/ving/PanelFrame.vue';

definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const notify = useNotify();
const id = route.params.id.toString();
const maintenancetask = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/maintenancetask/${id}`,
    createApi: `/api/${useRestVersion()}/maintenancetask`,
    query: { includeMeta: true, includeRelated: ['itemSet'], includeOptions: true, includeRelated: ['itemSet'] },
    onUpdate() {
        notify.success('Updated Maintenance Task.');
    },
    async onDelete() {
        await navigateTo('/maintenancetask');
    },
});
await maintenancetask.fetch()

const links = useMaintenanceLinks();

onBeforeRouteLeave(() => {
    maintenancetask.dispose();
});
</script>