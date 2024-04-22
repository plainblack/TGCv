<template>

     <Chip class="mr-1" v-tooltip="mFile.related?.s3file?.props?.sizeInBytes + ' bytes'" >
   
        <a :href="mFile.related?.s3file?.meta?.fileUrl" class="inline-block">
            <span class="vertical-align-middle"><img :src="mFile.related?.s3file?.meta?.thumbnailUrl"></span>
            <span class="vertical-align-middle">{{ mFile.related?.s3file?.props?.filename }}</span>
        </a>
         <Button v-if="mFile.meta?.isOwner"  title="Delete" alt="Delete Maintenance File" icon="pi pi-trash" text severity="danger" @click="mFile.delete()" />
    </Chip>
</template>

<script setup>
const props = defineProps({
    mFile: Object,
});

</script>