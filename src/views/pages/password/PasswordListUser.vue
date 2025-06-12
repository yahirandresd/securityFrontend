<script setup lang="ts">
import { usePasswordStore } from '../../../store/PasswordStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const passwordStore = usePasswordStore();
const userId = Number(route.params.id);

onMounted(async () => {
  if (!isNaN(userId)) {
    await passwordStore.fetchPasswordsByUser(userId);
  }
});
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Contraseñas del Usuario {{ userId }}</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr class="bg-purple-100">
            <th class="py-3 px-6 border-b text-center font-semibold">ID</th>
            <th class="py-3 px-6 border-b text-center font-semibold">Inicio</th>
            <th class="py-3 px-6 border-b text-center font-semibold">Fin</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(pwd, idx) in passwordStore.passwords"
            :key="pwd.id"
            :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
          >
            <td class="py-3 px-6 border-b text-center">{{ pwd.id }}</td>
            <td class="py-3 px-6 border-b text-center">{{ new Date(pwd.startAt).toLocaleDateString() }}</td>
            <td class="py-3 px-6 border-b text-center">{{ new Date(pwd.endAt).toLocaleDateString() }}</td>
          </tr>
          <tr v-if="passwordStore.passwords.length === 0">
            <td colspan="3" class="py-4 text-center text-gray-500">No hay contraseñas registradas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
