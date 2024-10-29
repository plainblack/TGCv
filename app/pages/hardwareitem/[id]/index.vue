<template>
    <Title>Edit Hardware Item</Title>

    <PanelFrame section="Hardware" :title="hardwareitem.props.name">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>

                <FieldsetNav v-if="hardwareitem.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput name="name" type="text" v-model="hardwareitem.props.name" required label="Name"
                                @change="hardwareitem.save('name')" />
                        </div>
                        <div class="mb-4">
                            <FormInput type="select" name="status" :options="hardwareitem.options?.status"
                                v-model="hardwareitem.props.status" label="Status"
                                @change="hardwareitem.save('status')" />
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ hardwareitem.props?.id }}
                            <CopyToClipboard size="xs" :text="hardwareitem.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(hardwareitem.props.createdAt) }}</div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(hardwareitem.props.updatedAt) }}</div>
                        <div class="mb-4"><b>Hardware Set</b>: <NuxtLink
                                :to="`/hardwareitemset/${hardwareitem.props?.hardwareItemSetId}`">{{
                hardwareitem.related?.itemSet?.props?.name }}</NuxtLink>
                        </div>

                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <Button @click="hardwareitem.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Hardware Item"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    </FieldsetItem>

                </FieldsetNav>
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
const hardwareitem = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwareitem/${id}`,
    createApi: `/api/${useRestVersion()}/hardwareitem`,
    query: { includeMeta: true, includeOptions: true, includeRelated: ['itemSet'] },
    onUpdate() {
        notify.success('Updated Hardware Item.');
    },
    async onDelete() {
        await navigateTo('/hardwareitem');
    },
});


await hardwareitem.fetch();
const links = useHardwareLinks();
onBeforeRouteLeave(() => hardwareitem.dispose());
</script>