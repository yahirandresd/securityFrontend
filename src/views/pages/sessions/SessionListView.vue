<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class=" mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Sesiones</h1>

            <router-link to="/sessions/create"
                class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircleIcon class="w-5 h-5 mr-2" />
                Crear Sesion
            </router-link>

            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">Id usuario</th>        
                            <th class="px-4 py-2 border">Token</th>
                            <th class="px-4 py-2 border">Expiracion</th>
                            <th class="px-4 py-2 border">Codigo</th>
                            <th class="px-4 py-2 border">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="session in sessions" :key="session.id" class="hover:bg-gray-100 transition">
                            <td class="px-4 py-2 border">{{ session.user_id }}</td>
                            <td class="px-4 py-2 border">{{ session.token }}</td>
                            <td class="px-4 py-2 border">{{ session.expiration }}</td>
                            <td class="px-4 py-2 border">{{ session.FACode }}</td>
                            <td class="px-4 py-2 border">{{ session.state }}</td>
                            <td class="px-4 py-2 border flex space-x-4">
                                <router-link :to="`/sessions/update/${session.id}`"
                                    class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <PencilIcon class="w-5 h-5 mr-1" />
                                    Editar
                                </router-link>
                                <button @click="deleteSession(session.id)"
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
import { useSessionStore } from '@/store/SessionStore';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';

const store = useSessionStore();

onMounted(() => {
    store.fetchSessions();
});

// Siempre está pendiente si hay un cambio en el store
const sessions = computed(() => store.sessions);
const deleteSession = async (id: string) => {
    await store.removeSession(id);
    await store.fetchSessions();
};
</script>