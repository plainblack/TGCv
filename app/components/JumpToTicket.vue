<template>
    <InputGroup>
        <InputGroupAddon>
            <Icon name="mdi:pound" color="red" />
        </InputGroupAddon>
        <InputText type="text" placeholder="Ticket #" class="w-full" v-model="ticketNumber" />
        <Button label="Go to" @click="findTicket" />
    </InputGroup>
</template>

<script setup>
const ticketNumber = ref('');

async function findTicket() {
    const hardwareticket = useVingRecord({
        fetchApi: `/api/${useRestVersion()}/hardwaretickets/lookupticket?ticketNumber=${ticketNumber.value}`,
    });
    await hardwareticket.fetch();
    await navigateTo(`/hardwaretickets/${hardwareticket.props.id}`);
}
</script>