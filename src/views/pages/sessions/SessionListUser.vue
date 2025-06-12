<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSessionStore } from "../../../store/SessionStore";

const route = useRoute();
const sessionStore = useSessionStore();

const userId = Number(route.params.id);

onMounted(async () => {
  if (userId) {
    await sessionStore.fetchSessionsByUser(userId);
  }
});
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-6 text-center">Sesiones del Usuario {{ userId }}</h1>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr class="bg-blue-100 text-center">
            <th class="py-3 px-4 border-b">ID</th>
            <th class="py-3 px-4 border-b">Token</th>
            <th class="py-3 px-4 border-b">FACode</th>
            <th class="py-3 px-4 border-b">Estado</th>
            <th class="py-3 px-4 border-b">Expira</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in sessionStore.Sessions" :key="s.id" :class="i % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
            <td class="py-2 px-4 border-b text-center">{{ s.id }}</td>
            <td class="py-2 px-4 border-b text-center truncate max-w-xs">{{ s.token }}</td>
            <td class="py-2 px-4 border-b text-center">{{ s.FACode }}</td>
            <td class="py-2 px-4 border-b text-center capitalize">{{ s.state }}</td>
            <td class="py-2 px-4 border-b text-center">{{ s.expiration }}</td>
          </tr>
          <tr v-if="sessionStore.Sessions.length === 0">
            <td colspan="5" class="text-center text-gray-500 py-4">No hay sesiones registradas.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
