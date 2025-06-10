<template>
    <div>
        <h1>Crear Dispositivo</h1>
        <DeviseForm @submit="createDevise" />
    </div>
</template>

<script setup lang="ts">
import DeviseForm from '@/components/Devises/DeviseForm.vue';
</script>