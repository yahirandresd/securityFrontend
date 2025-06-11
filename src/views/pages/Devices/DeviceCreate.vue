<template>
    <div>
        <h1>Crear Dispositivo</h1>
        <DeviceForm @submit="createDevice" />
    </div>
</template>

<script setup lang="ts">
import DeviceForm from '@/components/Devices/DeviceForm.vue';
</script>