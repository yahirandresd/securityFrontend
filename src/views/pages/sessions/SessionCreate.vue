<template>
    <div>
        <h1>Crear Sesion</h1>
        <SessionForm @submit="createSession" />
    </div>
</template>

<script setup lang="ts">
import SessionForm from '@/components/sessions/SessionForm.vue';
</script>