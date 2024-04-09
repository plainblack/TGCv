<template>
    <h1>Maintenance Items</h1>

    <div class="surface-card p-4 border-1 surface-border border-round">

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-search" />
            </InputGroupAddon>
            <InputText type="text" placeholder="Maintenance Items" class="w-full"
                v-model="maintenanceitems.query.search" @keydown.enter="maintenanceitems.search()" />
            <Button label="Search" @click="maintenanceitems.search()" />
        </InputGroup>

        <DataTable :value="maintenanceitems.records" stripedRows @sort="(e) => maintenanceitems.sortDataTable(e)">
            
            <Column field="props.id" header="Id" sortable>
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceitem/${slotProps.data.props.id}`" v-ripple>
                        {{ slotProps.data.props.id }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="props.createdAt" header="Created At" sortable>
                <template #body="slotProps">
                    {{ dt.formatDateTime(slotProps.data.props.createdAt) }}
                </template>
            </Column>
            <Column field="props.updatedAt" header="Updated At" sortable>
                <template #body="slotProps">
                    {{ dt.formatDateTime(slotProps.data.props.updatedAt) }}
                </template>
            </Column>
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
            <Column field="props.maintenanceItemSetId" header="Maintenance Item Set Id" sortable></Column>
            <Column header="Manage">
                <template #body="slotProps">
                    <NuxtLink :to="`/maintenanceitem/${slotProps.data.props.id}`" class="mr-2 no-underline">
                        <Button icon="pi pi-eye"  title="View" alt="View Maintenance Item" />
                    </NuxtLink>
                    <NuxtLink v-if="slotProps.data.meta?.isOwner" :to="`/maintenanceitem/${slotProps.data.props.id}/edit`" class="mr-2 no-underline">
                        <Button icon="pi pi-pencil" severity="success" title="Edit" alt="Edit Maintenance Item" />
                    </NuxtLink>
                    <Button v-if="slotProps.data.meta?.isOwner"  title="Delete" alt="Delete Maintenance Item" icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                </template>
            </Column>
        </DataTable>
        <Pager :kind="maintenanceitems" />
    </div>
    <div class="mt-5 surface-card p-5 border-1 surface-border border-round">
        <h2 class="mt-0">Create Maintenance Item</h2>

        <Form :send="() => maintenanceitems.create()">
            <div class="flex gap-5 flex-column-reverse md:flex-row">
                <div class="flex-auto p-fluid">
                    
                    <div class="mb-4">
                        <FormInput name="name" type="text" v-model="maintenanceitems.new.name" required label="Name" />
                    </div>
                    <div class="mb-4">
                        <FormSelect name="status" :options="maintenanceitems.propsOptions?.status" v-model="maintenanceitems.new.status" label="Status" />
                    </div>
                    <div class="mb-4">
                        <FormInput name="maintenanceItemSetId" type="text" v-model="maintenanceitems.new.maintenanceItemSetId" required label="Maintenance Item Set Id" />
                    </div>
                    <div>
                        <Button type="submit" class="w-auto" severity="success">
                        <i class="pi pi-plus mr-1"></i> Create Maintenance Item
                        </Button>
                    </div>
                </div>

            </div>
        </Form>
    </div>
</template>

<script setup>
const dt = useDateTime();
const maintenanceitems = useVingKind({
    listApi: `/api/${restVersion()}/maintenanceitem`,
    createApi: `/api/${restVersion()}/maintenanceitem`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { name: '', status: 'in_use', maintenanceItemSetId: '' },
});
await Promise.all([
    maintenanceitems.search(),
    maintenanceitems.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => maintenanceitems.dispose());
</script>