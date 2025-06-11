<template>
    <div>
        <h1>Crear Role</h1>
        <RoleForm @submit="createRole" />
    </div>
</template>

<script setup lang="ts">
import RoleForm from '@/components/role/RoleForm.vue';
</script>