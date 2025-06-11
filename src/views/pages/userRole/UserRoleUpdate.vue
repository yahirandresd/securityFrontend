<template>
    <div>
        <h1>Editar User Role</h1>
        <UserRoleForm v-if="route.params.id" :userRoleId="id" @submit="updateUserRole" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import UserRoleForm from '@/components/userRole/UserRoleForm.vue';
const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
</script>
