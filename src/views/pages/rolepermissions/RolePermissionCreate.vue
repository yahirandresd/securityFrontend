<template>
    <div>
        <h1>Crear Permiso a rol</h1>
        <RolePermissionForm @submit="createRolePermission" />
    </div>
</template>

<script setup lang="ts">
import RolePermissionForm from '@/components/rolepermissions/RolePermissionForm.vue';
</script>