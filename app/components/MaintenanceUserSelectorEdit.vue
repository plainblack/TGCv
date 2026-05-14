<template>
    <div class="mb-4">
        <FormInput type="select"
            :options="musers.recordsAsOptions('props', 'username')"
            name="claimedByUserId" v-model="target.props.claimedByUserId" label="Claimed By" @change="target.save('claimedByUserId')">
        </FormInput>
    </div>
</template>

<script setup>
const props = defineProps({
    target: { required: true },
    musers: { required: true },
});
</script>