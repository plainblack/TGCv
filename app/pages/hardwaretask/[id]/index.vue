<template>
    <Title>Edit Hardware Task</Title>

    <PanelFrame section="Hardware" :title="hardwaretask.props.description">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>

                <FieldsetNav v-if="hardwaretask.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput name="description" type="text" v-model="hardwaretask.props.description" required
                                label="Description" @change="hardwaretask.save('description')" />
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ hardwaretask.props?.id }}
                            <CopyToClipboard size="xs" :text="hardwaretask.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(hardwaretask.props.createdAt) }}</div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(hardwaretask.props.updatedAt) }}</div>
                        <div class="mb-4"><b>Hardware Set</b>: <NuxtLink
                                :to="`/hardwareitemset/${hardwaretask.props?.hardwareItemSetId}`">{{
                hardwaretask.related?.itemSet?.props?.name }}</NuxtLink>
                        </div>
                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <Button @click="hardwaretask.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Hardware Task"><i class="pi pi-trash mr-1"></i> Delete</Button>
                    </FieldsetItem>

                </FieldsetNav>
        </template>
    </PanelFrame>
</template>

<script setup>
import PanelFrame from '~/components/ving/PanelFrame.vue';

definePageMeta({
    middleware: ['auth', 'maintenance-manager', 'all-workaround']
});
const route = useRoute();
const notify = useNotify();
const id = route.params.id.toString();
const hardwaretask = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwaretask/${id}`,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
    query: { includeMeta: true, includeRelated: ['itemSet'] },
    onUpdate() {
        notify.success('Updated Hardware Task.');
    },
    async onDelete() {
        await navigateTo('/hardwaretask');
    },
});
await hardwaretask.fetch()

const links = useHardwareLinks();

onBeforeRouteLeave(() => {
    hardwaretask.dispose();
});
</script>