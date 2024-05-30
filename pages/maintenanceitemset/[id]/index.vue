<template>
    <Crumbtrail :crumbs="breadcrumbs" />
    <h1>Edit Maintenance Item Set</h1>

    <FieldsetNav v-if="maintenanceitemset.props">
        <FieldsetItem name="Properties">

            <div class="mb-4">
                <FormInput name="name" type="text" v-model="maintenanceitemset.props.name" required label="Name"
                    @change="maintenanceitemset.save('name')" />
            </div>
            <div class="mb-4">
                <FormInput type="select" name="status" :options="maintenanceitemset.options?.status"
                    v-model="maintenanceitemset.props.status" label="Status"
                    @change="maintenanceitemset.save('status')" />
            </div>
        </FieldsetItem>
        <FieldsetItem name="Items">
            <DataTable :value="maintenanceitems.records" stripedRows @sort="(e) => maintenanceitems.sortDataTable(e)">

                <Column field="props.name" header="Name" sortable>
                    <template #body="slotProps">
                        <NuxtLink :to="`/maintenanceitem/${slotProps.data.props.id}`" v-ripple>
                            {{ slotProps.data.props.name }}
                        </NuxtLink>
                    </template>
                </Column>
                <Column field="props.status" header="Status" sortable>
                    <template #body="slotProps">
                        {{ enum2label(slotProps.data.props.status, maintenanceitems.propsOptions.status) }}
                    </template>
                </Column>
                <Column header="Manage">
                    <template #body="slotProps">
                        <NuxtLink v-if="slotProps.data.meta?.isOwner"
                            :to="`/maintenanceitem/${slotProps.data.props.id}`" class="mr-2 no-underline">
                            <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Item" />
                        </NuxtLink>
                        <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance Item"
                            icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                    </template>
                </Column>
            </DataTable>
            <Pager :kind="maintenanceitems" />
            <Button icon="pi pi-pencil" label="Create Item" class="mr-2" severity="success"
                @click="createItems.visible = true" />

            <Dialog v-model:visible="createItems.visible" maximizable modal header="Header" :style="{ width: '75vw' }">
                <h2 class="mt-0">Create Maintenance Item</h2>

                <Form :send="() => maintenanceitems.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">

                            <div class="mb-4">
                                <FormInput name="name" type="text" v-model="maintenanceitems.new.name" required
                                    label="Name" />
                            </div>
                            <div class="mb-4">
                                <FormInput type="select" name="status" :options="maintenanceitems.propsOptions?.status"
                                    v-model="maintenanceitems.new.status" label="Status" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Maintenance Item
                                </Button>
                            </div>
                        </div>

                    </div>
                </Form>

            </Dialog>

        </FieldsetItem>

        <FieldsetItem name="Tasks">
            <DataTable :value="maintenancetasks.records" stripedRows @sort="(e) => maintenancetasks.sortDataTable(e)">
                <Column field="props.description" header="Description" sortable>
                    <template #body="slotProps">
                        <NuxtLink :to="`/maintenancetask/${slotProps.data.props.id}`" v-ripple>
                            {{ slotProps.data.props.description }}
                        </NuxtLink>
                    </template>
                </Column>
                <Column header="Manage">
                    <template #body="slotProps">
                        <NuxtLink v-if="slotProps.data.meta?.isOwner"
                            :to="`/maintenancetask/${slotProps.data.props.id}`" class="mr-2 no-underline">
                            <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Task" />
                        </NuxtLink>
                        <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance Task"
                            icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                    </template>
                </Column>
            </DataTable>
            <Pager :kind="maintenancetasks" />
            <Button icon="pi pi-pencil" label="Create Task" class="mr-2" severity="success"
                @click="createTasks.visible = true" />
            <Dialog v-model:visible="createTasks.visible" maximizable modal header="Header" :style="{ width: '75vw' }">

                <h2 class="mt-0">Create Maintenance Task</h2>

                <Form :send="() => maintenancetasks.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">

                            <div class="mb-4">
                                <FormInput name="description" type="text" v-model="maintenancetasks.new.description"
                                    required label="Description" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Maintenance Task
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Dialog>
        </FieldsetItem>

        <FieldsetItem name="Statistics">

            <div class="mb-4"><b>Id</b>: {{ maintenanceitemset.props?.id }}
                <CopyToClipboard size="xs" :text="maintenanceitemset.props?.id" />
            </div>

            <div class="mb-4"><b>Created At</b>: {{ dt.formatDateTime(maintenanceitemset.props.createdAt) }}</div>

            <div class="mb-4"><b>Updated At</b>: {{ dt.formatDateTime(maintenanceitemset.props.updatedAt) }}</div>

        </FieldsetItem>

        <FieldsetItem name="Actions">
            <Button @click="maintenanceitemset.delete()" severity="danger" class="mr-2 mb-2" title="Delete"
                alt="Delete Maintenance Item Set"><i class="pi pi-trash mr-1"></i> Delete</Button>
        </FieldsetItem>

    </FieldsetNav>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
});
const route = useRoute();
const dt = useDateTime();
const notify = useNotify();
const id = route.params.id.toString();
const maintenanceitemset = useVingRecord({
    id,
    fetchApi: `/api/${restVersion()}/maintenanceitemset/${id}`,
    createApi: `/api/${restVersion()}/maintenanceitemset`,
    query: { includeMeta: true, includeOptions: true },
    onUpdate() {
        notify.success('Updated Maintenance Item Set.');
    },
    async onDelete() {
        await navigateTo('/maintenanceitemset');
    },
});
await maintenanceitemset.fetch()

const breadcrumbs = [
    { label: 'Maintenance Item Sets', to: '/maintenanceitemset' },
    { label: `${maintenanceitemset.props.name}` },
];
const maintenanceitems = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceitem`,
    createApi: `/api/${restVersion()}/maintenanceitem`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', maintenanceItemSetId: maintenanceitemset.props.id },
    newDefaults: { name: '', status: 'in_use', maintenanceItemSetId: maintenanceitemset.props.id },
});
await Promise.all([
    maintenanceitems.search(),
    maintenanceitems.fetchPropsOptions(),
]);
const maintenancetasks = useVingKind({
    listApi: `/api/${restVersion()}/maintenancetask`,
    createApi: `/api/${restVersion()}/maintenancetask`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc', maintenanceItemSetId: maintenanceitemset.props.id },
    newDefaults: { description: '', maintenanceItemSetId: maintenanceitemset.props.id },
});
await Promise.all([
    maintenancetasks.search(),
    maintenancetasks.fetchPropsOptions(),
]);
const createItems = ref({ visible: false, });
const createTasks = ref({ visible: false, });

onBeforeRouteLeave(() => {
    maintenanceitems.dispose();
    maintenancetasks.dispose();
    maintenanceitemset.dispose();
});

</script>