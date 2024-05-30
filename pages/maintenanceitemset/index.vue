<template>
    <h1>Maintenance Item Sets</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText type="text" placeholder="Maintenance Item Sets" class="w-full"
                v-model="maintenanceitemsets.query.search" @keydown.enter="maintenanceitemsets.search()" />
            <Button label="Search" @click="maintenanceitemsets.search()" />
        </InputGroup>

        <DataTable :value="maintenanceitemsets.records" stripedRows @sort="(e) => maintenanceitemsets.sortDataTable(e)">

            <Column field="props.name" header="Name" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceitemset/${slotProps.data.props.id}`" v-ripple>
                        {{ slotProps.data.props.name }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="props.status" header="Status" sortable>
                <template #body="slotProps">
                    {{ enum2label(slotProps.data.props.status, maintenanceitemsets.propsOptions.status) }}
                </template>
            </Column>
            <Column field="props.itemCount" header="Item Count" />
            <Column field="props.taskCount" header="Task Count" />
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink v-if="slotProps.data.meta?.isOwner" :to="`/maintenanceitemset/${slotProps.data.props.id}`"
                        class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Item Set" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Maintenance Item Set"
                        icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenanceitemsets" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance Item Set</h2>

        <Form :send="() => maintenanceitemsets.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto">

                    <div class="mb-4">
                        <FormInput name="name" type="text" v-model="maintenanceitemsets.new.name" required
                            label="Name" />
                    </div>
                    <div class="mb-4">
                        <FormInput type="select" name="status" :options="maintenanceitemsets.propsOptions?.status"
                            v-model="maintenanceitemsets.new.status" label="Status" />
                    </div>
                    <div>
                        <Button type="submit" class="w-auto" severity="success">
                            <i class="pi pi-plus mr-1"></i> Create Maintenance Item Set
                        </Button>
                    </div>
                </div>

            </div>
        </Form>
    </div>
</template>

<script setup>
const maintenanceitemsets = useVingKind({
    listApi: `/api/${useRestVersion()}/maintenanceitemset`,
    createApi: `/api/${useRestVersion()}/maintenanceitemset`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { name: '', status: 'in_use' },
    onCreate: async (data) => { console.log(data); await navigateTo(`/maintenanceitemset/${data.props.id}`) },
});
await Promise.all([
    maintenanceitemsets.search(),
    maintenanceitemsets.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => maintenanceitemsets.dispose());
</script>