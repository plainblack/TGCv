<template>
  <client-only>  <Panel class="mt-3" toggleable>
            <template #header>
                <div class="flex align-items-center gap-2">
                    <span class="font-bold">{{remark.props?.submittedBy}}</span>
                </div>
            </template>
            <template #footer>
                <div class="flex flex-wrap align-items-center justify-content-between gap-3">  
                    <div class="flex align-items-center gap-2">
                        <Button icon="pi pi-user" rounded text>Maybe Quote Later</Button>
                    </div>
                    <div v-if="remark.props?.resolutionMinutes">
                        Time spent: {{ remark.props?.resolutionMinutes }} minutes
                    </div>
                    <span class="p-text-secondary">{{ dt.formatTimeAgo(remark.props?.updatedAt) }}</span>
                </div>
            </template>
            <template #icons>
                <button class="p-panel-header-icon p-link mr-2" @click="toggle">
                    <span class="pi pi-cog"></span>
                </button>
                <Menu ref="menu" id="config_menu" :model="items" popup >
                    <template #item="{ item, props }">
                        <a v-ripple class="flex align-items-center mb-2" @click="item.action">
                            <span :class="item.icon" />
                            <span class="ml-2">{{ item.label }}</span>
                        </a>
                    </template>
                </Menu>
            </template>
            <div class="m-0" v-if="! editable">
                {{ remark.props?.description }}
            </div>
            <div v-else>
                <div>
                    <FormInput name="description" type="textarea" v-model="remark.props.description" required
                    label="Description"/>
                </div>
                <div>
                    <Button class="w-auto" severity="success" title="Save" alt="Save" @click="remark.update(); editable=false;">
                        <i class="pi pi-plus mr-1"></i> Save
                    </Button>
                </div>
            </div>
        </Panel></client-only>
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

const dt = useDateTime();

</script>

<style scoped>
.p-panel.p-panel-toggleable .p-panel-header {
    margin-top: 0rem;
    margin-bottom: 0rem;
}
</style>