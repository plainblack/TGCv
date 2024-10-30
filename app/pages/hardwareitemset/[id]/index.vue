<template>
    <Title>Edit Hardware Set</Title>
    <PanelFrame section="Hardware Sets" :title="hardwareitemset.props.name">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>

                <FieldsetNav v-if="hardwareitemset.props">
                    <FieldsetItem name="Properties">

                        <div class="mb-4">
                            <FormInput name="name" type="text" v-model="hardwareitemset.props.name" required
                                label="Name" @change="hardwareitemset.save('name')" />
                        </div>
                        <div class="mb-4">
                            <FormInput type="select" name="status" :options="hardwareitemset.options?.status"
                                v-model="hardwareitemset.props.status" label="Status"
                                @change="hardwareitemset.save('status')" />
                        </div>
                    </FieldsetItem>
                    <FieldsetItem name="Items">
                        <DataTable :value="hardwareitems.records" stripedRows
                            @sort="(e) => hardwareitems.sortDataTable(e)">

                            <Column field="props.name" header="Name" sortable>
                                <template #body="slotProps">
                                    <NuxtLink :to="`/hardwareitem/${slotProps.data.props.id}`" v-ripple>
                                        {{ slotProps.data.props.name }}
                                    </NuxtLink>
                                </template>
                            </Column>
                            <Column field="props.status" header="Status" sortable>
                                <template #body="slotProps">
                                    {{ enum2label(slotProps.data.props.status, hardwareitems.propsOptions.status) }}
                                </template>
                            </Column>
                            <Column header="Manage">
                                <template #body="slotProps">
                                    <NuxtLink v-if="slotProps.data.meta?.isOwner"
                                        :to="`/hardwareitem/${slotProps.data.props.id}`" class="mr-2 no-underline">
                                        <Button icon="pi pi-pencil" severity="success" title="Edit"
                                            alt="Edit Hardware Item" />
                                    </NuxtLink>
                                    <Button v-if="slotProps.data.meta?.isOwner" title="Delete"
                                        alt="Delete Hardware Item" icon="pi pi-trash" severity="danger"
                                        @click="slotProps.data.delete()" />
                                </template>
                            </Column>
                        </DataTable>
                        <Pager :kind="hardwareitems" />
                        <Button icon="pi pi-pencil" label="Create Item" class="mr-2" severity="success"
                            @click="createItems.visible = true" />

                        <Dialog v-model:visible="createItems.visible" maximizable modal header="Header"
                            :style="{ width: '75vw' }">
                            <h2 class="mt-0">Create Hardware Item</h2>

                            <Form :send="() => hardwareitems.create()">
                                <div class="flex gap-5 flex-column-reverse md:flex-row">
                                    <div class="flex-auto">

                                        <div class="mb-4">
                                            <FormInput name="name" type="text" v-model="hardwareitems.new.name" required
                                                label="Name" />
                                        </div>
                                        <div class="mb-4">
                                            <FormInput type="select" name="status"
                                                :options="hardwareitems.propsOptions?.status"
                                                v-model="hardwareitems.new.status" label="Status" />
                                        </div>
                                        <div>
                                            <Button type="submit" class="w-auto" severity="success">
                                                <i class="pi pi-plus mr-1"></i> Create Hardware Item
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </Form>

                        </Dialog>

                    </FieldsetItem>

                    <FieldsetItem name="Tasks">
                        <DataTable :value="hardwaretasks.records" stripedRows
                            @sort="(e) => hardwaretasks.sortDataTable(e)">
                            <Column field="props.description" header="Description" sortable>
                                <template #body="slotProps">
                                    <NuxtLink :to="`/hardwaretask/${slotProps.data.props.id}`" v-ripple>
                                        {{ slotProps.data.props.description }}
                                    </NuxtLink>
                                </template>
                            </Column>
                            <Column header="Manage">
                                <template #body="slotProps">
                                    <NuxtLink v-if="slotProps.data.meta?.isOwner"
                                        :to="`/hardwaretask/${slotProps.data.props.id}`" class="mr-2 no-underline">
                                        <Button icon="pi pi-pencil" severity="success" title="Edit"
                                            alt="Edit Hardware Task" />
                                    </NuxtLink>
                                    <Button v-if="slotProps.data.meta?.isOwner" title="Delete"
                                        alt="Delete Hardware Task" icon="pi pi-trash" severity="danger"
                                        @click="slotProps.data.delete()" />
                                </template>
                            </Column>
                        </DataTable>
                        <Pager :kind="hardwaretasks" />
                        <Button icon="pi pi-pencil" label="Create Task" class="mr-2" severity="success"
                            @click="createTasks.visible = true" />
                        <Dialog v-model:visible="createTasks.visible" maximizable modal header="Header"
                            :style="{ width: '75vw' }">

                            <h2 class="mt-0">Create Hardware Task</h2>

                            <Form :send="() => hardwaretasks.create()">
                                <div class="flex gap-5 flex-column-reverse md:flex-row">
                                    <div class="flex-auto">

                                        <div class="mb-4">
                                            <FormInput name="description" type="text"
                                                v-model="hardwaretasks.new.description" required label="Description" />
                                        </div>
                                        <div>
                                            <Button type="submit" class="w-auto" severity="success">
                                                <i class="pi pi-plus mr-1"></i> Create Hardware Task
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Dialog>
                    </FieldsetItem>

                    <FieldsetItem name="Statistics">

                        <div class="mb-4"><b>Id</b>: {{ hardwareitemset.props?.id }}
                            <CopyToClipboard size="xs" :text="hardwareitemset.props?.id" />
                        </div>

                        <div class="mb-4"><b>Created At</b>: {{ formatDateTime(hardwareitemset.props.createdAt) }}
                        </div>

                        <div class="mb-4"><b>Updated At</b>: {{ formatDateTime(hardwareitemset.props.updatedAt) }}
                        </div>

                    </FieldsetItem>

                    <FieldsetItem name="Actions">
                        <Button @click="hardwareitemset.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                            alt="Delete Hardware Item Set"><i class="pi pi-trash mr-1"></i> Delete</Button>
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
const hardwareitemset = useVingRecord({
    id,
    fetchApi: `/api/${useRestVersion()}/hardwareitemset/${id}`,
    createApi: `/api/${useRestVersion()}/hardwareitemset`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Hardware Item Set.');
    },
    async onDelete() {
        await navigateTo('/hardwareitemset');
    },
});
await hardwareitemset.fetch()

const links = useHardwareLinks();
const hardwareitems = useVingKind({
    listApi: hardwareitemset.links.items.href,
    createApi: `/api/${useRestVersion()}/hardwareitem`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc',},
    newDefaults: { name: '', status: 'in_use', hardwareItemSetId: hardwareitemset.props?.id },
});
await Promise.all([
    hardwareitems.search(),
    hardwareitems.fetchPropsOptions(),
]);
const hardwaretasks = useVingKind({
    listApi: hardwareitemset.links.tasks.href,
    createApi: `/api/${useRestVersion()}/hardwaretask`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', },
    newDefaults: { description: '', hardwareItemSetId: hardwareitemset.props.id },
});
await Promise.all([
    hardwaretasks.search(),
    hardwaretasks.fetchPropsOptions(),
]);
const createItems = ref({ visible: false, });
const createTasks = ref({ visible: false, });

onBeforeRouteLeave(() => {
    hardwareitems.dispose();
    hardwaretasks.dispose();
    hardwareitemset.dispose();
});

</script>
