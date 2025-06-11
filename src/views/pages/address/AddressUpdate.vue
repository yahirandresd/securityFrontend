<template>
    <div>
        <h1>Editar Address</h1>
        <AddressForm v-if="route.params.id" :addressId="parseInt(route.params.id)" @submit="updateAddress" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import AddressForm from '@/components/address/AddressForm.vue';
const route = useRoute();
</script>
