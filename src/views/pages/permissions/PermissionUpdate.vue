<template>
    <div>
        <h1>Editar Permiso</h1>
        <PermissionForm v-if="route.params.id" :PermissionId="parseInt(route.params.id)" @submit="updatePermission" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PermissionForm from '@/components/permissions/PermissionForm.vue';
const route = useRoute();
</script>
