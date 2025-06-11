<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.signatureId ? "Editar Firma Digital" : "Crear Firma Digital" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Archivo de Firma -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Firma (archivo de imagen):</label>
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
          <span class="text-red-500 text-sm" v-if="errors.photo">{{ errors.photo }}</span>
        </div>

        <!-- Selección de Usuario -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Usuario:</label>
          <select
            v-model.number="signature.user_id"
            @change="validateField('user_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option disabled value="">Seleccione un usuario</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
        </div>

        <!-- Botón de envío -->
        <div class="col-span-1 md:col-span-2">
          <button
            type="submit"
            :disabled="Object.keys(errors).length > 0 || isSubmitting"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {{ isSubmitting ? "Enviando..." : props.signatureId ? "Actualizar" : "Crear" }}
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
import { useDigitalSignatureStore } from '@/store/DigitalSignatureStore';
import { DigitalSignatureValidator } from '@/utils/DigitalSignatureValidator';

const props = defineProps<{ signatureId?: number }>();

const router = useRouter();
const digitalSignatureStore = useDigitalSignatureStore();
const userStore = useUserStore();

const users = ref([]);
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);

// Declaramos el estado de la firma
const signature = reactive<{
  id: number;
  photo: File | null;
  user_id: number | '';
}>({
  id: 0,
  photo: null,
  user_id: '',
});

onMounted(async () => {
  await userStore.getUsers();
  users.value = userStore.users;

  if (props.signatureId) {
    const response = await digitalSignatureStore.getSignature(props.signatureId);
    if (response.status === 200) {
      const data = response.data;
      signature.id = data.id;
      signature.user_id = data.user_id;
    }
  }
});

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  signature.photo = file;
  validateField('photo');
};

const validateField = (field: 'photo' | 'user_id') => {
  const result = DigitalSignatureValidator.validateField(field, signature[field]);
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
  if (Object.keys(errors).length > 0 || !signature.photo) {
    if (!signature.photo) errors.photo = "Debe subir un archivo de imagen";
    return;
  }

  isSubmitting.value = true;

  try {
    let response;
    if (props.signatureId) {
      const formData = new FormData();
      formData.append("photo", signature.photo);
      response = await digitalSignatureStore.editSignature(props.signatureId, formData);
    } else {
      response = await digitalSignatureStore.addSignature(signature.user_id as number, signature.photo);
    }

    if ([200, 201].includes(response.status)) {
      Swal.fire({
        title: 'Éxito',
        text: props.signatureId ? 'Firma actualizada con éxito ✅' : 'Firma creada con éxito ✅',
        icon: 'success',
        timer: 3000,
        confirmButtonText: 'OK',
      });
      router.push('/signatures');
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