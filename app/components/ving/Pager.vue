<template>
    <Paginator :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown RowsPerPageDropdown'
        }"
        :rowsPerPageOptions="[10, 20, 50, 100]" :alwaysShow="false" :totalRecords="kind.paging.totalItems"
        :rows="kind.paging.itemsPerPage" :pageCount="kind.paging.totalPages" :page="kind.paging.page" @page="changePage" @update:rows="changePageSize">
    </Paginator>
</template>

<script setup>
const props = defineProps(['kind']);

function changePage(pager) {
    props.kind.query.page = pager.page + 1;
    props.kind.search();
}

function changePageSize(newSize) {
    props.kind.query.itemsPerPage = newSize;
    props.kind.query.page = 1;
    props.kind.search();
}
</script>