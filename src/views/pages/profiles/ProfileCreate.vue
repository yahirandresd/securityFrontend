<template>
    <div>
        <h1>Crear Perfil</h1>
        <ProfileForm @submit="createProfile" />
    </div>
</template>

<script setup lang="ts">
import ProfileForm from '@/components/profiles/ProfileForm.vue';
</script>