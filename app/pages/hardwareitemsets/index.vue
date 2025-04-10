<template>
    <Title>Hardware Item Sets</Title>
    <PanelFrame section="Hardware Sets" title="Hardware Sets">
        <template #left>
            <PanelNav :links="links" />
        </template>
        <template #content>
            <PanelZone title="Existing Hardware Sets">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-search" />
                    </InputGroupAddon>
                    <InputText type="text" placeholder="Hardware" class="w-full" v-model="hardwareitemsets.query.search"
                        @keydown.enter="hardwareitemsets.search()" />
                    <Button label="Search" @click="hardwareitemsets.search()" />
                </InputGroup>

                <DataTable :value="hardwareitemsets.records" stripedRows
                    @sort="(e) => hardwareitemsets.sortDataTable(e)">

                    <Column field="props.name" header="Name" sortable>
                        <template #body="slotProps">
                            <NuxtLink to=slotProps.data.links.edit.href v-ripple>
                                {{ slotProps.data.props.name }}
                            </NuxtLink>
                        </template>
                    </Column>
                    <Column field="props.status" header="Status" sortable>
                        <template #body="slotProps">
                            {{ enum2label(slotProps.data.props.status, hardwareitemsets.propsOptions.status) }}
                        </template>
                    </Column>
                    <Column field="props.itemCount" header="Item Count" />
                    <Column field="props.taskCount" header="Task Count" />
                    <Column header="Manage">
                        <template #body="slotProps">
                            <NuxtLink v-if="slotProps.data.meta?.isOwner"
                                to=slotProps.data.links.edit.href class="mr-2 no-underline">
                                <Button icon="pi pi-pencil" severity="success" title="Edit"
                                    alt="Edit Hardware Item Set" />
                            </NuxtLink>
                            <Button v-if="slotProps.data.meta?.isOwner" title="Delete" alt="Delete Hardware Item Set"
                                icon="pi pi-trash" severity="danger" @click="slotProps.data.delete()" />
                        </template>
                    </Column>
                </DataTable>
                <Pager :kind="hardwareitemsets" />
            </PanelZone>
            <PanelZone title="Create Hardware Set">
                <VForm :send="() => hardwareitemsets.create()">
                    <div class="flex gap-5 flex-column-reverse md:flex-row">
                        <div class="flex-auto">

                            <div class="mb-4">
                                <FormInput name="name" type="text" v-model="hardwareitemsets.new.name" required
                                    label="Name" />
                            </div>
                            <div class="mb-4">
                                <FormInput type="select" name="status" :options="hardwareitemsets.propsOptions?.status"
                                    v-model="hardwareitemsets.new.status" label="Status" />
                            </div>
                            <div>
                                <Button type="submit" class="w-auto" severity="success">
                                    <i class="pi pi-plus mr-1"></i> Create Hardware Set
                                </Button>
                            </div>
                        </div>
                    </div>
                </VForm>
            </PanelZone>
        </template>
    </PanelFrame>

</template>

<script setup>
definePageMeta({
    middleware: ['auth', 'maintenance-production-manager', 'all-workaround']
});
const hardwareitemsets = useVingKind({
    listApi: `/api/${useRestVersion()}/hardwareitemsets`,
    createApi: `/api/${useRestVersion()}/hardwareitemsets`,
    query: { includeMeta: true, sortBy: 'createdAt', sortOrder: 'desc' },
    newDefaults: { name: 'New Hardware Set', status: 'in_use' },
    onCreate: async (data) => { await navigateTo(`/hardwareitemsets/${data.props.id}`) },
});
const links = useHardwareLinks();
await Promise.all([
    hardwareitemsets.search(),
    hardwareitemsets.fetchPropsOptions(),
]);
onBeforeRouteLeave(() => hardwareitemsets.dispose());
</script>