<script setup lang="ts">
import { useRoleStore } from '@/store/RoleStore';
import { RoleValidator } from '@/utils/RoleValidators';
import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{ roleId?: number; disabled?: boolean }>();

const role = reactive({
    name: '',
    description: ''
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');
const store = useRoleStore(); // Asegúrate de importar y usar el store correcto
const router = useRouter();

const validateField = (field: keyof typeof role) => {
    const result = RoleValidator.validateField(field, role[field]);

    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field]; // Borra el error si es válido
    }
};

const validateAllFields = () => {
    Object.keys(role).forEach((field) => {
        validateField(field as keyof typeof role);
    });
};

// Cargar Rol si se pasa un userId
onMounted(async () => {
    if (props.roleId) {
        try {
            const response = await store.getRole(props.roleId);
            if (response.status == 200) {
                let fetchedUser = response.data;
                Object.assign(role, fetchedUser);
            }
        } catch (error) {
            console.error('Error al cargar Rol:', error);
        }
    }
});

// Enviar formulario (crear o actualizar Rol)
const submitForm = async () => {
    validateAllFields();

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = '';

    try {
        let response;
        if (props.roleId) {
            response = await store.editRole(props.roleId, role);
        } else {
            response = await store.addRole(role);
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                title: 'Éxito',
                text: props.roleId ? 'Rol actualizado con éxito ✅' : 'Rol creado con éxito ✅',
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
    router.push('/roles');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.disabled ? 'Ver Role' : props.roleId ? 'Editar Rol' : 'Crear Rol' }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        :disabled="props.disabled"
                        v-model="role.name"
                        type="text"
                        @input="validateField('name')"
                        @blur="validateField('name')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Descripción:</label>
                    <input
                        :disabled="props.disabled"
                        v-model="role.description"
                        type="text"
                        @input="validateField('description')"
                        @blur="validateField('description')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span class="text-red-500 text-sm" v-if="errors.description">{{ errors.description }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button v-if="!props.disabled" type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? 'Enviando...' : props.roleId ? 'Actualizar' : 'Crear' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
