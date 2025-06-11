<template>
    <div>
        <h1>Crear Respuesta de Seguridad</h1>
        <AnswerForm @submit="createAnswer" />
    </div>
</template>

<script setup lang="ts">
import AnswerForm from '@/components/Answer/AnswerForm.vue';
</script>