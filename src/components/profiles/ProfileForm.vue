<script setup lang="ts">
import { useProfileStore } from '@/store/ProfileStore';
import { ProfileValidator } from "@/utils/ProfileValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps<{ ProfileId?: number }>();

const Profile = reactive({
    user_id: null,
    phone: '',
    photo: '' // Solo usamos esto para mostrar el nombre
});

const selectedFile = ref<File | null>(null); // archivo real

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const store = useProfileStore();
const router = useRouter();
const users = ref<User[]>([]);

const fileInput = ref<HTMLInputElement | null>(null);

const openFileDialog = () => {
    fileInput.value?.click();
};

const handleFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
        selectedFile.value = file;
        Profile.photo = file.name; // solo para mostrar el nombre
        validateField('photo');
    }
};

const validateField = (field: keyof typeof Profile) => {
    const result = ProfileValidator.validateField(field, Profile[field]);
    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field];
    }
};

const validateAllFields = () => {
    Object.keys(Profile).forEach((field) => {
        validateField(field as keyof typeof Profile);
    });
};

onMounted(async () => {
    if (props.ProfileId) {
        try {
            const response = await store.getProfile(props.ProfileId);
            if (response.status === 200) {
                Object.assign(Profile, response.data);
            }
        } catch (error) {
            console.error("Error al cargar Perfil:", error);
        }
    }

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        users.value = response.data;

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
});

const submitForm = async () => {
  validateAllFields();
  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessage.value = "";

  try {
    const formData = new FormData();
    formData.append('phone', Profile.phone);
    if (selectedFile.value) {
      formData.append('photo', selectedFile.value);
    }

    let response;

    if (props.ProfileId) {
      // Modo edición
      response = await store.editProfile(props.ProfileId, formData);
    } else {
      // Modo creación
      if (Profile.user_id == null || isNaN(Number(Profile.user_id))) {
        Swal.fire("Error", "Debe seleccionar un usuario válido", "error");
        isSubmitting.value = false;
        return;
      }
      console.log("Enviando perfil con user_id:", Profile.user_id);
      response = await store.addProfile(Profile.user_id, formData);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.ProfileId ? 'Perfil actualizado con éxito ✅' : 'Perfil creado con éxito ✅',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      });
      router.push('/Profiles');
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
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.ProfileId ? "Editar Perfil" : "Crear Perfil" }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Selector de usuario -->
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Usuario:</label>
                    <select v-model="Profile.user_id" @change="validateField('user_id')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Usuario</option>
                        <option v-for="user in users" :key="user.id" :value="Number(user.id)">
                            {{ user.name }} (ID: {{ user.id }})

                        </option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
                </div>

                <!-- Campo teléfono -->
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Teléfono:</label>
                    <input v-model="Profile.phone" type="text" @input="validateField('phone')"
                        @blur="validateField('phone')"
                        class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.phone">{{ errors.phone }}</span>
                </div>

                <!-- Campo foto con botón de archivo -->
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Foto:</label>
                    <div class="flex items-center gap-2">
                        <input v-model="Profile.photo" readonly
                            class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                        <button type="button" @click="openFileDialog"
                            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Cargar
                        </button>
                    </div>
                    <input ref="fileInput" type="file" @change="handleFileChange" class="hidden" accept="image/*" />
                    <span class="text-red-500 text-sm" v-if="errors.photo">{{ errors.photo }}</span>
                </div>

                <!-- Botón de enviar -->
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
