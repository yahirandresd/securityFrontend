<template>
    <div>
        <h1>Editar Respuesta</h1>
        <AnswerForm v-if="route.params.id" :answerId="parseInt(route.params.id)" @submit="updateAnswer" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import AnswerForm from '@/components/Answer/AnswerForm.vue';
const route = useRoute();
</script>
