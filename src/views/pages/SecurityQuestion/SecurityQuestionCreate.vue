<template>
    <div>
        <h1>Crear Pregunta de Seguridad</h1>
        <SecurityQuestionForm @submit="createSecurityQuestion" />
    </div>
</template>

<script setup lang="ts">
import SecurityQuestionForm from '@/components/SecurityQuestion/SecurityQuestionForm.vue';
</script>