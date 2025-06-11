<template>
    <div>
        <h1>Crear User Role</h1>
        <UserRoleForm @submit="createUserRole" />
    </div>
</template>

<script setup lang="ts">
import UserRoleForm from '@/components/userRole/UserRoleForm.vue';
</script>