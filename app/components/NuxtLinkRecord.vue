<template>
    <NuxtLink :to="props.pageHref + '/' + thisRecord.props?.id">{{ thisRecord.props?.name }}</NuxtLink>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    kind: { required: true },
    recordId: { required: true },
    pageHref: { required: true },
});

const thisRecord = computed(() => {
    const record = props.kind.find(props.recordId);
    if (record == undefined) {
        return { links : { self : "#" }, props : { name : "Unknown"} };
    }
    return props.kind.find(props.recordId);
});

</script>