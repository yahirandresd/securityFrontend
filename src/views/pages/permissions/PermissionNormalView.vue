<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Permiso</h2>

      <div v-if="Permission">

        <!-- Información del permiso -->
        <div class="text-lg text-gray-700 space-y-4">
          <p><strong>Url:</strong> {{ Permission.url }}</p>
          <p><strong>Metodo:</strong> {{ Permission.method }}</p>
          <p><strong>Entidad:</strong> {{ Permission.entity }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">Cargando permiso...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Permission } from '@/models/Permission'; // si tienes esta interfaz separada
import { usePermissionStore } from '@/store/PermissionStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const PermissionStore = usePermissionStore();
const Permission = ref<Permission | null>(null);

onMounted(async () => {
  const PermissionId = Number(route.params.id);
  if (PermissionId) {
    const response = await PermissionStore.getPermission(PermissionId);
    if (response.status === 200) {
      Permission.value = response.data;
    }
  }
});
</script>