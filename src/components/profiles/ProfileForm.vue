<script setup lang="ts">
import { useProfileStore } from '@/store/ProfileStore';
import { ProfileValidator } from "@/utils/ProfileValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import axios from 'axios'; // Usado para obtener los usuarios

const props = defineProps<{ ProfileId?: number }>();

const Profile = reactive({
  user_id: null,
  phone: '',
  photo: ''
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const store = useProfileStore();
const router = useRouter();
const users = ref<{ id: number, name: string }[]>([]); // Para la lista de usuarios

const fileInput = ref<HTMLInputElement | null>(null);

// Abrir diálogo de archivos
const openFileDialog = () => {
  fileInput.value?.click();
};

// Guardar nombre del archivo como string
const handleFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    Profile.photo = file.name; // Solo guardamos el nombre, como el backend espera
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

// Cargar perfil si se pasa un ID
onMounted(async () => {
  if (props.ProfileId) {
    try {
      const response = await store.getProfile(props.ProfileId);
      if (response.status == 200) {
        Object.assign(Profile, response.data);
      }
    } catch (error) {
      console.error("Error al cargar Perfil:", error);
    }
  }

  // Cargar lista de usuarios
  try {
    const response = await axios.get("/api/users"); // Ajusta la URL si es distinta
    users.value = response.data;
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
});

// Enviar formulario
const submitForm = async () => {
  validateAllFields();
  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessage.value = "";

  try {
    let response;
    if (props.ProfileId) {
      response = await store.editProfile(props.ProfileId, Profile);
    } else {
      response = await store.addProfile(Profile);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.ProfileId ? 'Perfil actualizado con éxito ✅' : 'Perfil creado con éxito ✅',
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

  router.push('/Profiles');
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
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }} (ID: {{ user.id }})
            </option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
        </div>

        <!-- Campo teléfono -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input v-model="Profile.phone" type="text" @input="validateField('phone')" @blur="validateField('phone')"
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
