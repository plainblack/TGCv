<template>
    <NuxtLink :to="thisRecord.links?.self">{{ thisRecord.props?.name }}</NuxtLink>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    kind: { required: true },
    recordId: { required: true },
});

const thisRecord = computed(() => {
    return props.kind.find(props.recordId);
});

</script>