<template>
    <div>
        <h1>Editar Permiso a rol</h1>
        <RolePermissionForm v-if="route.params.id" :RolePermissionId="parseInt(route.params.id)" @submit="updateRolePermission" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import RolePermissionForm from '@/components/rolepermissions/RolePermissionForm.vue';
const route = useRoute();
</script>