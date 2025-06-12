<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de User Roles</h1>

            <router-link to="/user-roles/create" class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4">
                <PlusCircleIcon class="w-5 h-5 mr-2" />
                Crear User Role
            </router-link>

            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead class="bg-gray-200 text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">Id</th>
                            <th class="px-4 py-2 border">Id User</th>
                            <th class="px-4 py-2 border">Id Role</th>
                            <th class="px-4 py-2 border">Start At</th>
                            <th class="px-4 py-2 border">End At</th>
                            <th class="px-4 py-2 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="userRole in userRoles" :key="userRole.id" class="hover:bg-gray-100 transition">
                            <td class="px-4 py-2 border">{{ userRole.id }}</td>
                            <td class="px-4 py-2 border">{{ userRole.user_id }}</td>
                            <td class="px-4 py-2 border">{{ userRole.role_id }}</td>
                            <td class="px-4 py-2 border">{{ userRole.startAt }}</td>
                            <td class="px-4 py-2 border">{{ userRole.endAt }}</td>

                            <td class="px-4 py-2 border flex space-x-4">
                                <router-link :to="`/user-roles/view/${userRole.id}`" class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <EyeIcon class="w-5 h-5 mr-1" />
                                    Ver
                                </router-link>
                                <router-link :to="`/user-roles/update/${userRole.id}`" class="text-blue-600 hover:text-blue-800 flex items-center">
                                    <PencilIcon class="w-5 h-5 mr-1" />
                                    Editar
                                </router-link>
                                <button @click="deleteUserRole(userRole.id)" class="text-red-600 hover:text-red-800 flex items-center">
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
import { useUserRoleStore } from '@/store/UserRoleStore';
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';

const store = useUserRoleStore();

onMounted(() => {
    store.fetchUserRoles();
});

// Siempre está pendiente si hay un cambio en el store
const userRoles = computed(() => store.userRoles);
const deleteUserRole = async (id: string) => {
    await store.removeUserRole(id);
    await store.fetchUserRoles();
};
</script>
