<template>
    <div>
        <h1>Editar Dispositivo</h1>
        <DeviseForm v-if="route.params.id" :deviseId="parseInt(route.params.id)" @submit="updateDevise" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import DeviseForm from '@/components/Devises/DeviseForm.vue';
const route = useRoute();
</script>
