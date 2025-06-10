<script setup lang="ts">
import { useProfileStore } from '@/store/ProfileStore';
import { ProfileValidator } from "@/utils/ProfileValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ ProfileId?: number }>();

const Profile = reactive({
    phone: '';
    photo: '';
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const store = useProfileStore();
const router = useRouter();

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

// Cargar Perfil si se pasa un ProfileId
onMounted(async () => {
  if (props.ProfileId) {
    try {
      const response = await store.getProfile(props.ProfileId);
      if (response.status == 200) {
        let fetchedProfile = response.data
        Object.assign(Profile, fetchedProfile);
      }


    } catch (error) {
      console.error("Error al cargar Perfil:", error);
    }
  }
});

// Enviar formulario (crear o actualizar Perfil)
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
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">foto:</label>
          <input v-model="Profile.photo" type="text" @input="validateField('photo')" @blur="validateField('photo')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.photo">{{ errors.photo }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">telefono:</label>
          <input v-model="Profile.phone" type="text" @input="validateField('phone')" @blur="validateField('phone')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
        
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
