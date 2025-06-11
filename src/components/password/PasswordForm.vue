<script setup lang="ts">
import type { User } from '@/models/User'; // Asegúrate que este path sea correcto
import { usePasswordStore } from '@/store/PasswordStore';
import { useUserStore } from '@/store/UserStore';
import { PasswordValidator } from '@/utils/PasswordValidator';

import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ passwordId?: number; disabled?: boolean }>();

const password = reactive({
    content: '',
    startAt: '',
    endAt: '',
    user_id: null // Asumiendo que el password tiene un campo userId
});
const emit = defineEmits(['submit']);

const formatDateTime = (date: string): string => {
    return `${date} 00:00:00`;
};

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');
const store = usePasswordStore();
const router = useRouter();

const users = ref<User[]>([]);
const userStore = useUserStore();
const loadUsers = async () => {
    try {
        const response = await userStore.getUsers(); // o como se llame tu método del store

        users.value = response;
        console.log('Usuarios cargados:', users.value);
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
};

const validateField = (field: keyof typeof password) => {
    const result = PasswordValidator.validateField(field, password[field]);

    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field];
    }
};

const validateAllFields = () => {
    Object.keys(password).forEach((field) => {
        validateField(field as keyof typeof password);
    });
};

// Cargar contraseña si se pasa un passwordId
onMounted(async () => {
    await loadUsers();
    if (props.passwordId) {
        try {
            const response = await store.getPassword(props.passwordId);
            if (response.status == 200) {
                let fetchedPassword = response.data;
                console.log('Password recibido:', fetchedPassword);
                // Asignar los datos al formulario
                password.content = fetchedPassword.content;
                password.user_id = fetchedPassword.user_id;
                password.startAt = new Date(fetchedPassword.startAt).toISOString().slice(0, 10);
                password.endAt = new Date(fetchedPassword.endAt).toISOString().slice(0, 10);
            }
        } catch (error) {
            console.error('Error al cargar contraseña:', error);
        }
    }
});

// Enviar formulario (crear o actualizar contraseña)
const submitForm = async () => {
    validateAllFields();

    
    const payload = {
        ...password,
        startAt: `${password.startAt} 00:00:00`,
        endAt: `${password.endAt} 00:00:00`
    };

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = '';

    try {
        let response;
        if (props.passwordId) {
            response = await store.editPassword(props.passwordId, payload);
        } else {
            response = await store.addPassword(payload);
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                title: 'Éxito',
                text: props.passwordId ? 'Password actualizado con éxito ✅' : 'Password creado con éxito ✅',
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
    router.push('/passwords');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.disabled ? 'Ver Password' : props.passwordId ? 'Editar Password' : 'Crear Password' }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Usuario:</label>
                    <select v-model="password.user_id" :disabled="props.disabled" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Seleccione un usuario</option>
                        <option v-for="user in users" :key="user.id" :value="user.id" :disabled="user.has_address">
                            {{ user.name }} ({{ user.email }})
                            <span v-if="user.address"> - Ya tiene dirección</span>
                        </option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.user">{{ errors.user }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Content:</label>
                    <input
                        :disabled="props.disabled"
                        v-model="password.content"
                        type="text"
                        @input="validateField('content')"
                        @blur="validateField('content')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span class="text-red-500 text-sm" v-if="errors.content">{{ errors.content }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">StartAt:</label>
                    <input
                        :disabled="props.disabled"
                        v-model="password.startAt"
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
                        v-model="password.endAt"
                        type="date"
                        @input="validateField('endAt')"
                        @blur="validateField('endAt')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span class="text-red-500 text-sm" v-if="errors.endAt">{{ errors.endAt }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button v-if="!props.disabled" type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? 'Enviando...' : props.passwordId ? 'Actualizar' : 'Crear' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
