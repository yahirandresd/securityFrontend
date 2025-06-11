<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.ProfileId ? "Editar Perfil Digital" : "Crear Perfil Digital" }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Archivo de Perfil -->
                <div class="w-full md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Perfil (archivo de imagen):</label>
                    <input type="file" accept="image/*" @change="onFileChange"
                        class="w-full p-2 border border-gray-300 rounded-lg" />
                    <span class="text-red-500 text-sm" v-if="errors.photo">{{ errors.photo }}</span>
                </div>

                <!-- Selección de Usuario -->
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Usuario:</label>
                    <select v-model.number="Profile.user_id" @change="validateField('user_id')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg">
                        <option disabled value="">Seleccione un usuario</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.name }}
                        </option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
                </div>
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Teléfono:</label>
                    <input v-model="Profile.phone" type="text" @input="validateField('phone')"
                        @blur="validateField('phone')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.phone">{{ errors.phone }}</span>
                </div>

                <!-- Botón de envío -->
                <div class="col-span-1 md:col-span-2">
                    <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? "Enviando..." : props.ProfileId ? "Actualizar" : "Crear" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

import { useUserStore } from '@/store/UserStore';
import { useProfileStore } from '@/store/ProfileStore';
import { ProfileValidator } from '@/utils/ProfileValidator';

const props = defineProps<{ ProfileId?: number }>();

const router = useRouter();
const digitalProfileStore = useProfileStore();
const userStore = useUserStore();

const users = ref([]);
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);

// Declaramos el estado de la Perfil
const Profile = reactive<{
    id: number;
    photo: File | null;
    user_id: number | '';
    phone:''
}>({
    id: 0,
    photo: null,
    user_id: '',
    phone: ''
});

onMounted(async () => {
    await userStore.getUsers();
    users.value = userStore.users;

    if (props.ProfileId) {
        const response = await digitalProfileStore.getProfile(props.ProfileId);
        if (response.status === 200) {
            const data = response.data;
            Profile.id = data.id;
            Profile.user_id = data.user_id;
            Profile.phone = data.phone
        }
    }
});

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0] || null;
    Profile.photo = file;
    validateField('photo');
};

const validateField = (field: 'photo' | 'user_id' | 'phone') => {
    const result = ProfileValidator.validateField(field, Profile[field]);
    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field];
    }
};

const validateAllFields = () => {
    (['photo', 'user_id'] as const).forEach(validateField);
};

const submitForm = async () => {
    validateAllFields();
    if (Object.keys(errors).length > 0 || !Profile.photo) {
        if (!Profile.photo) errors.photo = "Debe subir un archivo de imagen";
        return;
    }

    isSubmitting.value = true;

    try {
        let response;
        if (props.ProfileId) {
            const formData = new FormData();
            formData.append("photo", Profile.photo);
            response = await digitalProfileStore.editProfile(props.ProfileId, Profile.photo);
        } else {
            response = await digitalProfileStore.addProfile(Profile.user_id as number, Profile.photo);
        }

        if ([200, 201].includes(response.status)) {
            Swal.fire({
                title: 'Éxito',
                text: props.ProfileId ? 'Perfil actualizado con éxito ✅' : 'Perfil creado con éxito ✅',
                icon: 'success',
                timer: 3000,
                confirmButtonText: 'OK',
            });
            router.push('/profiles');
        } else {
            Swal.fire({
                title: 'Error',
                text: `❌ Código ${response.status}: ${response.data?.message || 'Ocurrió un error'}`,
                icon: 'error',
                timer: 3000,
                confirmButtonText: 'Intentar de nuevo',
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error',
            text: '❌ Error inesperado en la operación.',
            icon: 'error',
            timer: 3000,
            confirmButtonText: 'OK',
        });
    } finally {
        isSubmitting.value = false;
    }
};
</script>