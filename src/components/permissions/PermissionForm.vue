<script setup lang="ts">
import { usePermissionStore } from '@/store/PermissionStore';
import { PermissionValidator } from "@/utils/PermissionValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ PermissionId?: number }>();

const Permission = reactive({
    url: '';
    method: '';
    entity: '';
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const store = usePermissionStore();
const router = useRouter();

const validateField = (field: keyof typeof Permission) => {
    const result = PermissionValidator.validateField(field, Permission[field]);

    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field]; // Borra el error si es válido
    }
};

const validateAllFields = () => {
    Object.keys(Permission).forEach((field) => {
        validateField(field as keyof typeof Permission);
    });
};

// Cargar Permiso si se pasa un PermissionId
onMounted(async () => {
    if (props.PermissionId) {
        try {
            const response = await store.getPermission(props.PermissionId);
            if (response.status == 200) {
                let fetchedPermission = response.data
                Object.assign(Permission, fetchedPermission);
            }


        } catch (error) {
            console.error("Error al cargar Permiso:", error);
        }
    }
});

// Enviar formulario (crear o actualizar Permiso)
const submitForm = async () => {
    validateAllFields();

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = "";

    try {
        let response;
        if (props.PermissionId) {
            response = await store.editPermission(props.PermissionId, Permission);
        } else {
            response = await store.addPermission(Permission);
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                title: 'Éxito',
                text: props.PermissionId ? 'Permiso actualizado con éxito ✅' : 'Permiso creado con éxito ✅',
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
    router.push('/Permissions');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.PermissionId ? "Editar Permiso" : "Crear Permiso" }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Url:</label>
                    <input v-model="Permission.url" type="text" @input="validateField('url')"
                        @blur="validateField('url')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.url">{{ errors.url }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Método:</label>
                    <select v-model="Permission.method" @change="validateField('method')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Seleccione un método</option>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.method">{{ errors.method }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Entidad:</label>
                    <input v-model="Permission.entity" type="text" @input="validateField('entity')"
                        @blur="validateField('entity')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.entity">{{ errors.entity }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? "Enviando..." : props.PermissionId ? "Actualizar" : "Crear" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
