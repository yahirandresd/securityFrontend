<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDeviceStore } from '@/stores/DeviceStore';

const route = useRoute();
const deviceStore = useDeviceStore();

onMounted(async () => {
  const userId = Number(route.params.id);
  if (!isNaN(userId)) {
    await deviceStore.fetchDevicesByUser(userId);
  }
});
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Dispositivos del Usuario</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr class="bg-blue-100">
            <th class="py-3 px-6 border-b text-center font-semibold">ID</th>
            <th class="py-3 px-6 border-b text-center font-semibold">IP</th>
            <th class="py-3 px-6 border-b text-center font-semibold">Nombre</th>
            <th class="py-3 px-6 border-b text-center font-semibold">Sistema Operativo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(device, idx) in deviceStore.devices"
            :key="device.id"
            :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
          >
            <td class="py-3 px-6 border-b text-center">{{ device.id }}</td>
            <td class="py-3 px-6 border-b text-center">{{ device.ip }}</td>
            <td class="py-3 px-6 border-b text-center">{{ device.name }}</td>
            <td class="py-3 px-6 border-b text-center">{{ device.operating_system }}</td>
          </tr>
          <tr v-if="deviceStore.devices.length === 0">
            <td colspan="4" class="py-4 text-center text-gray-500">
              No hay dispositivos registrados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
