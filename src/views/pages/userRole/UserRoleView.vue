<template>
  <div>
    <UserRoleForm :userRoleId="id" :disabled="true" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import UserRoleForm from '@/components/userRole/UserRoleForm.vue';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
</script>
