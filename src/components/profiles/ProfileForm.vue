<script setup lang="ts">
import { useProfileStore } from '@/store/ProfileStore';
import { useUserStore } from '@/store/UserStore';
import { ProfileValidator } from '@/utils/ProfileValidator';
import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/models/User'; // Asegúrate que este path sea correcto


const props = defineProps<{ ProfileId?: number }>();

const Profile = reactive({
    user_id: null,// Asumiendo que el Profile tiene un campo userId
    phone: '',
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');
const store = useProfileStore();
const router = useRouter();
const photoFile = ref<File | null>(null);

const users = ref<User[]>([]);
const userStore = useUserStore(); // si ya tienes un store de Perfiles

const loadUsers = async () => {
    try {
        const response = await userStore.getUsers(); // o como se llame tu método del store
        users.value = response;
        console.log('Perfiles cargados:', users.value);
    } catch (error) {
        console.error('Error cargando Perfiles:', error);
    }
};


const validateField = (field: keyof typeof Profile) => {
    const result = ProfileValidator.validateField(field, Profile[field]);

    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field]; // Borra el error si es válido
    }
};

const validateAllFields = () => {
    Object.keys(Profile).forEach((field) => {
        validateField(field as keyof typeof Profile);
    });
};
const onPhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  photoFile.value = target.files?.[0] || null;
};

onMounted(async () => {
    await loadUsers();

    if (props.ProfileId) {
        try {
            const response = await store.getProfile(props.ProfileId);
            if (response.status == 200) {
                Object.assign(Profile, response.data);
            }
        } catch (error) {
            console.error("Error al cargar Profile:", error);
        }
    }
});


const submitForm = async () => {
    validateAllFields();
    const formData = new FormData();
    formData.append('user_id', Profile.user_id);
    formData.append('phone', Profile.phone);

    if (photoFile.value) {
        formData.append('photo', photoFile.value); // Solo si se seleccionó un archivo
    }


    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = '';

    try {
        let response;
        if (props.ProfileId) {
            response = await store.editProfile(props.ProfileId, formData);
        } else {
            response = await store.addProfile(formData);
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                title: 'Éxito',
                text: props.ProfileId ? 'Profile actualizado con éxito ✅' : 'Usuario creado con éxito ✅',
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
    router.push('/profiles');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.ProfileId ? 'Editar Profile' : 'Crear Profile' }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Usuario:</label>
                    <select v-model="Profile.user_id"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Seleccione un usuario</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} ({{ user.email }})
                        </option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.user">{{ errors.user }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Numero:</label>
                    <input v-model="Profile.phone" type="text" @input="validateField('phone')"
                        @blur="validateField('phone')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.phone">{{ errors.phone }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Foto:</label>
                    <input type="file" accept="image/*" @change="onPhotoChange"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />

                    <span class="text-red-500 text-sm" v-if="errors.photo">{{ errors.photo }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? 'Enviando...' : props.ProfileId ? 'Actualizar' : 'Crear' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
