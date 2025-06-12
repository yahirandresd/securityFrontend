<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Administrador - Permisos</h1>

    <div v-if="loading">Cargando permisos...</div>
    <div v-else>
      <PermissionTable
        :groupedPermissions="groupedPermissions"
        :methods="methods"
        :togglePermission="togglePermission"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import PermissionTable from '@/views/pages/permissions/PermissionTable.vue';
import { usePermissionStore } from '@/store/PermissionStore';

const route = useRoute();
const permissionStore = usePermissionStore();

const groupedPermissions = ref<any[]>([]);
const loading = ref(true);
const roleId = Number(route.params.id);

const methods = ['VIEW', 'GET', 'POST', 'PUT', 'DELETE'];

onMounted(async () => {
  try {
    console.log("🔍 onMounted ejecutado");
    const data = await permissionStore.fetchGroupedPermissions(roleId);
    console.log("PERMISOS AGRUPADOS:", data);
    groupedPermissions.value = data ?? []; // 👈 seguridad extra por si `data` es undefined
  } catch (error) {
    console.error("❌ Error en onMounted:", error);
    toast.error("Error al cargar permisos");
  } finally {
    loading.value = false;
  }
});

const togglePermission = async (permissions: any[], method: string) => {
  const perm = permissions.find(p => p.method === method);
  if (!perm) return;

  try {
    await permissionStore.updateRolePermission(roleId, perm.id, !perm.has_permission);
    groupedPermissions.value = await permissionStore.fetchGroupedPermissions(roleId);
    toast.success(`Permiso ${method} actualizado correctamente`);
  } catch (err) {
    toast.error(`No se pudo actualizar el permiso ${method}`);
  }
};
</script>
