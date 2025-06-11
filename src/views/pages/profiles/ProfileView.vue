<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Perfil Digital</h2>

      <div v-if="profile">
        <!-- Foto de perfil -->
        <div class="flex justify-center mb-6">
          <img v-if="profile.photo" :src="getPhotoUrl(profile.photo)" alt="Foto de perfil"
            class="w-48 h-48 object-cover rounded-full shadow" />
          <p v-else class="text-gray-500">Sin foto de perfil</p>
        </div>

        <!-- Información del perfil -->
        <div class="text-lg text-gray-700 space-y-4">
          <p><strong>ID de Usuario:</strong> {{ profile.user_id }}</p>
          <p><strong>Teléfono:</strong> {{ profile.phone }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">Cargando perfil...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@/models/Profile'; // si tienes esta interfaz separada
import { useProfileStore } from '@/store/ProfileStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const profileStore = useProfileStore();
const profile = ref<Profile | null>(null);

onMounted(async () => {
  const profileId = Number(route.params.id);
  if (profileId) {
    const response = await profileStore.getProfile(profileId);
    if (response.status === 200) {
      profile.value = response.data;
    }
  }
});

// Función para construir la URL de la imagen
const getPhotoUrl = (photo: string | File) => {
  console.log(photo);

  return `http://localhost:5000/api/${photo}`
};
</script>