<script setup lang="ts">
import { useSessionStore } from '@/store/SessionStore';
import { SessionValidator } from "@/utils/SessionValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ SessionId?: number }>();

const Session = reactive({
            user_id:null;
            token: '';
            expiration: '';
            FACode: '';
            state: '';
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessFACode = ref("");
const store = useSessionStore();
const router = useRouter();

const validateField = (field: keyof typeof Session) => {
  const result = SessionValidator.validateField(field, Session[field]);

  if (!result.success) {
    errors[field] = result.error.errors[0].messFACode;
  } else {
    delete errors[field]; // Borra el error si es válido
  }
};

const validateAllFields = () => {
  Object.keys(Session).forEach((field) => {
    validateField(field as keyof typeof Session);
  });
};

// Cargar sesion si se pasa un SessionId
onMounted(async () => {
  if (props.SessionId) {
    try {
      const response = await store.getSession(props.SessionId);
      if (response.status == 200) {
        let fetchedSession = response.data
        Object.assign(Session, fetchedSession);
      }


    } catch (error) {
      console.error("Error al cargar sesion:", error);
    }
  }
});

// Enviar formulario (crear o actualizar sesion)
const submitForm = async () => {
  validateAllFields();

  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessFACode.value = "";

  try {
    let response;
    if (props.SessionId) {
      response = await store.editSession(props.SessionId, Session);
    } else {
      response = await store.addSession(Session);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.SessionId ? 'sesion actualizada con éxito ✅' : 'sesion creada con éxito ✅',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: `❌ Código ${response.status}: ${response.data?.messFACode || 'Ocurrió un error'}`,
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
  router.push('/Sessions');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.SessionId ? "Editar sesion" : "Crear sesion" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Id usuario:</label>
          <input v-model="Session.user_id" type="number" @input="validateField('user_id')" @blur="validateField('user_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Token:</label>
          <input v-model="Session.token" type="text" @input="validateField('token')" @blur="validateField('token')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.token">{{ errors.token }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Expiracion:</label>
          <input v-model="Session.expiration" type="date" @input="validateField('expiration')"
            @blur="validateField('expiration')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.expiration">{{ errors.expiration }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Codigo:</label>
          <input v-model.number="Session.FACode" type="text" @input="validateField('FACode')" @blur="validateField('FACode')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.FACode">{{ errors.FACode }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Estado:</label>
          <input v-model="Session.state" type="text" @input="validateField('state')" @blur="validateField('state')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div class="col-span-1 md:col-span-2">
          <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
            {{ isSubmitting ? "Enviando..." : props.SessionId ? "Actualizar" : "Crear" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
