<template>
    <div>
        <h1>Crear Password</h1>
        <UserForm @submit="createPassword" />
    </div>
</template>

<script setup lang="ts">
import UserForm from '@/components/password/PasswordForm.vue';
</script>