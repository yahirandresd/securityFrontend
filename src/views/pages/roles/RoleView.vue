<template>
  <div>
    <RoleForm :roleId="parseInt(route.params.id)" :disabled="true" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import RoleForm from '@/components/role/RoleForm.vue';
const route = useRoute();
</script>
