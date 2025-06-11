<script setup lang="ts">
import type { Role } from '@/models/Role'; // Asegúrate que este path sea correcto
import type { User } from '@/models/User'; // Asegúrate que este path sea correcto

import { useRoleStore } from '@/store/RoleStore';
import { useUserRoleStore } from '@/store/UserRoleStore';
import { useUserStore } from '@/store/UserStore';

import { UserRoleValidator } from '@/utils/UserRoleValidator';
import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ userRoleId?: string; disabled?: boolean }>();

const userRole = reactive({
    user_id: null,
    role_id: null,
    startAt: null,
    endAt: null
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');
const store = useUserRoleStore(); // Asegúrate de importar y usar el store correcto
const router = useRouter();

const users = ref<User[]>([]);
const userStore = useUserStore();

const roles = ref<Role[]>([]);
const roleStore = useRoleStore();

const loadUsers = async () => {
    try {
        const response = await userStore.getUsers(); // o como se llame tu método del store

        users.value = response;
        console.log('Usuarios cargados:', users.value);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
};
const loadRole = async () => {
    try {
        const response = await roleStore.fetchRoles(); // o como se llame tu método del store

        roles.value = response;
        console.log('Roles cargados:', roles.value);
    } catch (error) {
        console.error('Error cargando roles:', error);
    }
};

const validateField = (field: keyof typeof userRole) => {
    const result = UserRoleValidator.validateField(field, userRole[field]);

    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field]; // Borra el error si es válido
    }
};

const validateAllFields = () => {
    Object.keys(userRole).forEach((field) => {
        validateField(field as keyof typeof userRole);
    });
};

// Cargar UserRole si se pasa un userRoleId
onMounted(async () => {
    await loadUsers();
    await loadRole();

    if (props.userRoleId) {
        try {
            const response = await store.getUserRole(props.userRoleId);
            if (response.status == 200) {
                let fetchedUserRole = response.data;
                userRole.role_id = fetchedUserRole.role_id;
                userRole.user_id = fetchedUserRole.user_id;
                userRole.startAt = new Date(fetchedUserRole.startAt).toISOString().slice(0, 10);
                userRole.endAt = new Date(fetchedUserRole.endAt).toISOString().slice(0, 10);
            }
        } catch (error) {
            console.error('Error al cargar UserRole:', error);
        }
    }
});

const submitForm = async () => {
    validateAllFields();

    const payload = {
        ...userRole,
        startAt: `${userRole.startAt} 00:00:00`,
        endAt: `${userRole.endAt} 00:00:00`
    };

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = '';

    try {
        let response;
        if (props.userRoleId) {
            response = await store.editUserRole(props.userRoleId, payload);
        } else {
            response = await store.addUserRole(payload);
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                title: 'Éxito',
                text: props.userRoleId ? 'User Rol actualizado con éxito ✅' : 'User Rol creado con éxito ✅',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: `❌ Código ${response.status}: ${response.data?.message || 'Ocurrió un error'}`,
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                timer: 3000
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: '❌ Error inesperado en la operación.',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000
        });
    } finally {
        isSubmitting.value = false;
    }
    router.push('/user-roles');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.disabled ? 'Ver User Role' : props.userRoleId ? 'Editar User Rol' : 'Crear User Rol' }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">User Id:</label>
                    <select v-model="userRole.user_id" :disabled="props.disabled" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Seleccione un usuario</option>
                        <option v-for="user in users" :key="user.id" :value="user.id" :disabled="user.has_address">
                            {{ user.name }} ({{ user.email }})
                            <span v-if="user.address"> - Ya tiene dirección</span>
                        </option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Role Id:</label>
                    <select v-model="userRole.role_id" :disabled="props.disabled" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Seleccione un usuario</option>
                        <option v-for="role in roles" :key="role.id" :value="role.id" :disabled="role.has_address">
                            {{ role.name }} 
                        </option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.role_id">{{ errors.role_id }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">StartAt:</label>
                    <input
                        :disabled="props.disabled"
                        v-model="userRole.startAt"
                        type="date"
                        @input="validateField('startAt')"
                        @blur="validateField('startAt')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span class="text-red-500 text-sm" v-if="errors.startAt">{{ errors.startAt }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">EndAt:</label>
                    <input
                        :disabled="props.disabled"
                        v-model="userRole.endAt"
                        type="date"
                        @input="validateField('endAt')"
                        @blur="validateField('endAt')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span class="text-red-500 text-sm" v-if="errors.endAt">{{ errors.endAt }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button v-if="!props.disabled" type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? 'Enviando...' : props.userRoleId ? 'Actualizar' : 'Crear' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
