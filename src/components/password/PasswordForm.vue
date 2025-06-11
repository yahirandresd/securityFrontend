<script setup lang="ts">
import { usePasswordStore } from '@/store/PasswordStore';
import { PasswordValidator } from '@/utils/PasswordValidator';
import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ passwordId?: number }>();

const password = reactive({
    content: '',
    startAd: null,
    endAd: null
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');
const store = usePasswordStore();
const router = useRouter();

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
    if (props.passwordId) {
        try {
            const response = await store.getPassword(props.passwordId);
            if (response.status == 200) {
                let fetchedPassword = response.data;
                Object.assign(password, fetchedPassword);
            }
        } catch (error) {
            console.error('Error al cargar contraseña:', error);
        }
    }
});

// Enviar formulario (crear o actualizar contraseña)
const submitForm = async () => {
    validateAllFields();

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = '';

    try {
        let response;
        if (props.passwordId) {
            response = await store.editPassword(props.passwordId, password);
        } else {
            response = await store.addPassword(password);
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
                {{ props.passwordId ? 'Editar Rol' : 'Crear Rol' }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input v-model="password.content" type="text" @input="validateField('content')" @blur="validateField('content')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.content">{{ errors.content }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Email:</label>
                    <input v-model="password.startAd" type="date" @input="validateField('startAd')" @blur="validateField('startAd')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.startAd">{{ errors.startAd }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Email:</label>
                    <input v-model="password.endAd" type="date" @input="validateField('endAd')" @blur="validateField('endAd')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.endAd">{{ errors.endAd }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? 'Enviando...' : props.passwordId ? 'Actualizar' : 'Crear' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
