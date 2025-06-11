<template>
  <div>
    <PasswordForm :passwordId="parseInt(route.params.id)" :disabled="true" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PasswordForm from '@/components/password/PasswordForm.vue';
const route = useRoute();
</script>
