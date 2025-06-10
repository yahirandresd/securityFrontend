<template>
    <div>
        <h1>Crear Address</h1>
        <AddressForm @submit="createAddress" />
    </div>
</template>

<script setup lang="ts">
import AddressForm from '@/components/address/AddressForm.vue';
</script>
