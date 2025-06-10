<template>
    <div>
        <h1>Editar Firma Digital</h1>
        <DigitalSignatureForm v-if="route.params.id" :signatureId="parseInt(route.params.id)" @submit="updateSignature" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import DigitalSignatureForm from '@/components/digitalSignature/digitalsignatureForm.vue';
const route = useRoute();
</script>
