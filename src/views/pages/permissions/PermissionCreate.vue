<template>
    <div>
        <h1>Crear Permiso</h1>
        <PermissionForm @submit="createPermission" />
    </div>
</template>

<script setup lang="ts">
import PermissionForm from '@/components/permissions/PermissionForm.vue';
</script>