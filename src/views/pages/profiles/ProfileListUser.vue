<script setup lang="ts">
import { useProfileStore } from '@/store/ProfileStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const profileStore = useProfileStore();
const route = useRoute();

onMounted(async () => {
    const userId = Number(route.params.id);
    if (userId) {
        await profileStore.fetchProfilesByUser(userId);
    }
});
</script>

<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Perfiles del Usuario</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-green-100">
                        <th class="py-3 px-6 border-b text-center font-semibold">Teléfono</th>
                        <th class="py-3 px-6 border-b text-center font-semibold">Foto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(profile, idx) in profileStore.Profiles" :key="profile.id"
                        :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                        <td class="py-3 px-6 border-b text-center">{{ profile.phone }}</td>
                        <td class="py-3 px-6 border-b text-center">
                            <img v-if="profile.photo"
                                :src="typeof profile.photo === 'string' ? profile.photo : URL.createObjectURL(profile.photo)"
                                alt="Foto" class="h-12 w-12 object-cover rounded-full mx-auto" />
                            <span v-else class="text-gray-400">Sin foto</span>
                        </td>
                    </tr>
                    <tr v-if="profileStore.Profiles.length === 0">
                        <td colspan="2" class="py-4 text-center text-gray-500">No hay perfiles registrados.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>