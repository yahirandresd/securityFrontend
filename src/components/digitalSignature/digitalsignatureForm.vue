<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.digitalSignatureId ? "Editar Firma Digital" : "Crear Firma Digital" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Campo para la Foto -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Foto de Firma:</label>
          <div class="flex items-center gap-2 mt-1">
            <input type="text" readonly :value="signature.photo"
              class="flex-1 p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
            <label class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition">
              Seleccionar
              <input type="file" accept="image/*" @change="handleFileChange" class="hidden" />
            </label>
          </div>
          <span class="text-red-500 text-sm" v-if="errors.photo">{{ errors.photo }}</span>
        </div>

        <!-- Campo para Usuario -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Usuario:</label>
          <select
            v-model="signature.user_id"
            @change="validateField('user_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
            {{ isSubmitting ? "Enviando..." : props.digitalSignatureId ? "Actualizar" : "Crear" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDigitalSignatureStore } from '@/store/DigitalSignatureStore';
import { DigitalSignatureValidator } from "@/utils/DigitalSignatureValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/UserStore';
import type { User } from '@/models/User'; // Asegúrate de que este tipo exista

const props = defineProps<{ digitalSignatureId?: number }>();

const signature = reactive({
  id: 0,
  photo: "",
  user_id: 0,
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const store = useDigitalSignatureStore();
const router = useRouter();

// Store de usuarios
const userStore = useUserStore();
const users = ref<{ id: number; name: string }[]>([]);

// Cargar usuarios y datos de firma si aplica
onMounted(async () => {
  try {
    await userStore.fetchUsers();
    users.value = userStore.users
      .filter((u: User) => u.id !== undefined && u.name !== undefined)
      .map((u: User) => ({ id: u.id!, name: u.name! }));
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }

  if (props.digitalSignatureId) {
    try {
      const response = await store.getDigitalSignature(props.digitalSignatureId);
      if (response.status === 200) {
        Object.assign(signature, response.data);
      }
    } catch (error) {
      console.error("Error al cargar firma digital:", error);
    }
  }
});

const validateField = (field: keyof typeof signature) => {
  const result = DigitalSignatureValidator.validateField(field, signature[field]);
  if (!result.success) {
    errors[field] = result.error.errors[0].message;
  } else {
    delete errors[field];
  }
};

const validateAllFields = () => {
  Object.keys(signature).forEach((field) => {
    validateField(field as keyof typeof signature);
  });
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    signature.photo = file.name;
    validateField('photo');
  }
};

const submitForm = async () => {
  validateAllFields();
  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;

  try {
    let response;
    if (props.digitalSignatureId) {
      response = await store.editDigitalSignature(props.digitalSignatureId, signature);
    } else {
      response = await store.addDigitalSignature(signature);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.digitalSignatureId ? 'Firma actualizada con éxito ✅' : 'Firma creada con éxito ✅',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      });
      router.push('/digital-signature');
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
