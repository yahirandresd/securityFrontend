<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Sesion</h2>

      <div v-if="session">

        <!-- Información del Sesion -->
        <div class="text-lg text-gray-700 space-y-4">
          <p><strong>Id usuario:</strong> {{ session.user_id }}</p>
          <p><strong>Token:</strong> {{ session.token }}</p>
          <p><strong>Expiracion:</strong> {{ session.expiration }}</p>
          <p><strong>Estado:</strong> {{ session.state }}</p>
          <p><strong>Codigo:</strong> {{ session.FACode }}</p>

        </div>
      </div>

      <div v-else class="text-center text-gray-500">Cargando Sesion...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Session } from '@/models/Session'; // si tienes esta interfaz separada
import { useSessionStore } from '@/store/SessionStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const SessionStore = useSessionStore();
const session = ref<Session | null>(null);

onMounted(async () => {
  const SessionId = String(route.params.id);
  if (SessionId) {
    const response = await SessionStore.getSession(SessionId);
    if (response.status === 200) {
      session.value = response.data;
    }
  }
});
</script>