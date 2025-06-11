<template>
    <div>
        <h1>Crear Firma Digital</h1>
        <digitalSignatureForm @submit="createSignature" />
    </div>
</template>

<script setup lang="ts">
import digitalSignatureForm from '@/components/digitalSignature/digitalsignatureForm.vue';
</script>
