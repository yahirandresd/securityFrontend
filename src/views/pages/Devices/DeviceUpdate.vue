<template>
    <div>
        <h1>Editar Dispositivo</h1>
        <DeviceForm v-if="route.params.id" :deviceId="parseInt(route.params.id)" @submit="updateDevice" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import DeviceForm from '@/components/Devices/DeviceForm.vue';
const route = useRoute();
</script>
