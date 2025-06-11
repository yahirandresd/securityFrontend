<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Roles</h1>

            <router-link to="/roles/create" class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircleIcon class="w-5 h-5 mr-2" />
                Crear Role
            </router-link>

            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">Id</th>
                            <th class="px-4 py-2 border">Name</th>
                            <th class="px-4 py-2 border">Description</th>
                            <th class="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-100 transition">
                            <td class="px-4 py-2 border">{{ role.id }}</td>
                            <td class="px-4 py-2 border">{{ role.name }}</td>
                            <td class="px-4 py-2 border">{{ role.description }}</td>
                           
                            <td class="px-4 py-2 border flex space-x-4">
                                <router-link :to="`/roles/view/${role.id}`" class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <EyeIcon class="w-5 h-5 mr-1" />
                                    Ver
                                </router-link>
                                <router-link :to="`/roles/update/${role.id}`" class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <PencilIcon class="w-5 h-5 mr-1" />
                                    Editar
                                </router-link>
                                <button @click="deleteRole(role.id)" class="text-red-600 hover:text-red-800 flex items-center">
                                    <TrashIcon class="w-5 h-5 mr-1" />
                                    Eliminar
                                </button>
                                <router-link :to="`role-permissions/${role.id}`" class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <Fingerprint class="w-5 h-5 mr-1" />
                                    Permissions
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoleStore } from '@/store/RoleStore';
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon, Fingerprint } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';

const store = useRoleStore();

onMounted(() => {
    store.fetchRoles();
});

// Siempre está pendiente si hay un cambio en el store
const roles = computed(() => store.roles);
const deleteRole = async (id: number) => {
    await store.removeRole(id);
    await store.fetchRoles();
};
</script>
