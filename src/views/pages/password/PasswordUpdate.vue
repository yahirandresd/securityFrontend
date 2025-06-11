<template>
    <div>
        <h1>Editar Password</h1>
        <PasswordForm v-if="route.params.id" :passwordId="parseInt(route.params.id)" @submit="updatePassword" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import PasswordForm from '@/components/password/PasswordForm.vue';
const route = useRoute();
</script>
