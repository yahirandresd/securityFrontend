<template>
    <div>
        <h1>Editar Role</h1>
        <RoleForm v-if="route.params.id" :roleId="parseInt(route.params.id)" @submit="updateRole" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import RoleForm from '@/components/role/RoleForm.vue';
const route = useRoute();
</script>
