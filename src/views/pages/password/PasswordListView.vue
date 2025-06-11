<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class=" mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Passwords</h1>

            <router-link to="/passwords/create"
                class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircleIcon class="w-5 h-5 mr-2" />
                Crear Password
            </router-link>

            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">Content</th>
                            <th class="px-4 py-2 border">StartAd</th>
                            <th class="px-4 py-2 border">EndAd</th>
                            <th class="px-4 py-2 border">User Id</th>
                            <th class="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="password in passwords" :key="password.id" class="hover:bg-gray-100 transition">
                            <td class="px-4 py-2 border">{{ password.content }}</td>
                            <td class="px-4 py-2 border">{{ password.startAt }}</td>
                            <td class="px-4 py-2 border">{{ password.endAt }}</td>
                            <td class="px-4 py-2 border">{{ password.user_id }}</td>
                            <td class="px-4 py-2 border flex space-x-4">
                                <router-link :to="`/passwords/view/${password.id}`"
                                    class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <EyeIcon class="w-5 h-5 mr-1" />
                                    Ver
                                </router-link>
                                <router-link :to="`/passwords/update/${password.id}`"
                                    class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <PencilIcon class="w-5 h-5 mr-1" />
                                    Editar
                                </router-link>
                                <button @click="deletePassword(password.id)"
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
import { usePasswordStore } from '@/store/PasswordStore';
import { PencilIcon, PlusCircleIcon, TrashIcon, EyeIcon } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';

const store = usePasswordStore();

onMounted(() => {
    store.fetchPasswords();
});

// Siempre está pendiente si hay un cambio en el store
const passwords = computed(() => store.passwords);
const deletePassword = async (id: number) => {
    await store.removePassword(id);
    await store.fetchPasswords();
};
</script>