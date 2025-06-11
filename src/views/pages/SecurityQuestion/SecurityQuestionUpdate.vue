<template>
    <div>
        <h1>Editar Pregunta de Seguridad</h1>
        <SecurityQuestionForm v-if="route.params.id" :questionId="parseInt(route.params.id)" @submit="updateQuestion" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import SecurityQuestionForm from '@/components/SecurityQuestion/SecurityQuestionForm.vue';
const route = useRoute();
</script>
