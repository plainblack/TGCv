<template>
    <Title>Edit Maintenance Item</Title>

    <PanelFrame section="Maintenance" title="Hardware Item">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone :title="maintenanceitem.props.name">

                <FieldsetNav v-if="maintenanceitem.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput name="name" type="text" v-model="maintenanceitem.props.name" required
                                label="Name" @change="maintenanceitem.save('name')" />
                        </div>
                        <div class="mb-4">
                            <FormInput type="select" name="status" :options="maintenanceitem.options?.status"
                                v-model="maintenanceitem.props.status" label="Status"
                                @change="maintenanceitem.save('status')" />
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ maintenanceitem.props?.id }}
                            <CopyToClipboard size="xs" :text="maintenanceitem.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(maintenanceitem.props.createdAt) }}</div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(maintenanceitem.props.updatedAt) }}</div>
                        <div class="mb-4"><b>Hardware Set</b>: <NuxtLink
                                :to="`/maintenanceitemset/${maintenanceitem.props?.maintenanceItemSetId}`">{{
                maintenanceitem.related?.itemSet?.props?.name }}</NuxtLink>
                        </div>

                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <Button @click="maintenanceitem.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Maintenance Item"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    </FieldsetItem>

                </FieldsetNav>
            </PanelZone>
        </template>
    </PanelFrame>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const notify = useNotify();
const id = route.params.id.toString();
const maintenanceitem = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/maintenanceitem/${id}`,
    createApi: `/api/${useRestVersion()}/maintenanceitem`,
    query: { includeMeta: true, includeRelated: ['itemSet'], includeOptions: true, includeRelated: ['itemSet'] },
    onUpdate() {
        notify.success('Updated Maintenance Item.');
    },
    async onDelete() {
        await navigateTo('/maintenanceitem');
    },
});


await maintenanceitem.fetch();
const links = useMaintenanceLinks();
onBeforeRouteLeave(() => maintenanceitem.dispose());
</script>