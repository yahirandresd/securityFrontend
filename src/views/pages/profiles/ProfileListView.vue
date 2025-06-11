<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class=" mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Perfiles</h1>

            <router-link to="/profiles/create"
                class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircleIcon class="w-5 h-5 mr-2" />
                Crear Perfil
            </router-link>

            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">Id usuario</th>
                            <th class="px-4 py-2 border">Foto</th>
                            <th class="px-4 py-2 border">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="profile in profiles" :key="profile.id" class="hover:bg-gray-100 transition">
                            <td class="px-4 py-2 border">{{ profile.user_id }}</td>
                            <td class="px-4 py-2 border">{{ profile.photo }}</td>
                            <td class="px-4 py-2 border">{{ profile.phone }}</td>
                            <td class="px-4 py-2 border flex space-x-4">
                                <router-link :to="`/profiles/view/${profile.id}`"
                                    class="text-green-600 hover:text-green-800 flex items-center">
                                    <EyeIcon class="w-5 h-5 mr-1" />
                                    Ver
                                </router-link>
                                <router-link :to="`/profiles/update/${profile.id}`"
                                    class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <PencilIcon class="w-5 h-5 mr-1" />
                                    Editar
                                </router-link>
                                <button @click="deleteProfile(profile.id)"
                                    class="text-red-600 hover:text-red-800 flex items-center">
                                    <TrashIcon class="w-5 h-5 mr-1" />
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useProfileStore } from '@/store/ProfileStore';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';

const store = useProfileStore();

onMounted(() => {
    store.fetchProfiles();
});

// Siempre está pendiente si hay un cambio en el store
const profiles = computed(() => store.Profiles);
const deleteProfile = async (id: number) => {
    await store.removeProfile(id);
    await store.fetchProfiles();
};
</script>