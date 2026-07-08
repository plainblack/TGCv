<template>
    <div class="mb-4">
        <FormInput type="select" :options="musers.recordsAsOptions('props', 'username')" placeholder="No one"
            name="claimedByUserId" v-model="target.props.claimedByUserId" :label="showLabel ? 'Claimed By' : ''"
            @change="target.save('claimedByUserId')">
        </FormInput>
        <Button v-if="showClaimButton" @click="claim()" severity="primary" class="mr-2 mb-2" title="Claim This"
            alt="Claim Hardware Ticket"><i class="pi pi-user-plus mr-1"></i> Claim</Button>
    </div>
</template>

<script setup>
const props = defineProps({
    target: { required: true },
    musers: { required: true },
    showLabel: { required: true },
    showClaimButton: { required: false }
});
const notify = useNotify();
async function claim() {
    await props.target.call('post', props.target.links?.self.href + '/claim', undefined, {
        onSuccess() {
            notify.info('Ticket claimed');
        }
    })
}

</script>