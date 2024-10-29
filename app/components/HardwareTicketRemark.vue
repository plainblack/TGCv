<template>
    <client-only>
        <Panel class="mt-3" toggleable>
            <template #footer>
                <Avatar size="large" :label="remark.props.submittedBy" class="overflow-hidden mr-4" />
                <span v-if="remark.props?.resolutionMinutes" class="mr-4">
                    Time spent: {{ remark.props?.resolutionMinutes }} minutes
                </span>
                <span class="p-text-secondary">Updated: {{ formatTimeAgo(remark.props?.updatedAt) }}</span>
            </template>
            <template #icons>
                <Button class="pi pi-cog" @click="toggle" rounded text severity="secondary" />
                <Menu ref="menu" id="config_menu" :model="items" popup />                
            </template>
            <div class="m-0" v-if="!editable">
                <MarkdownView :text="remark.props?.description" />
            </div>
            <div v-else>
                <div>
                    <FormInput name="description" type="textarea" v-model="remark.props.description" required
                        label="Description" />
                </div>
                <div>
                    <Button class="w-auto" severity="success" title="Save" alt="Save"
                        @click="remark.update(); editable = false;">
                        <i class="pi pi-plus mr-1"></i> Save
                    </Button>
                </div>
            </div>
        </Panel>
    </client-only>
</template>

<script setup>
const props = defineProps({
    remark: Object,
});

const menu = ref(null);
let editable = ref(false);
const items = ref([
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        action: () => { props.remark?.delete(); }
    },
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        action: () => { editable.value = true; }
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

</script>

<style scoped>
.p-panel.p-panel-toggleable .p-panel-header {
    margin-top: 0rem;
    margin-bottom: 0rem;
}
</style>