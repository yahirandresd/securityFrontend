<script setup lang="ts">
import { useSessionStore } from '@/store/SessionStore';
import { useUserStore } from '@/store/UserStore';
import { SessionValidator } from "@/utils/SessionValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';
import {User} from '@/models/User'

const props = defineProps<{ SessionId?: string }>();

const Session = reactive({
  user_id: null,
  token: '',
  expiration: null,
  FACode: '',
  state: '',
});

const users = ref<User[]>([]);
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessFACode = ref("");
const store = useSessionStore();
const router = useRouter();
const userStore = useUserStore()

const validateField = (field: keyof typeof Session) => {
  const result = SessionValidator.validateField(field, Session[field]);
  if (!result.success) {
    errors[field] = result.error.errors[0].message;
  } else {
    delete errors[field];
  }
};
const loadUsers = async () => {
  try {
    const response = await userStore.getUsers(); // o como se llame tu método del store
    users.value = response;
    console.log('Usuarios cargados:', users.value);
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
};
const validateAllFields = () => {
  Object.keys(Session).forEach((field) => {
    validateField(field as keyof typeof Session);
  });
};

onMounted(async () => {
  await loadUsers();
  if (props.SessionId) {
    try {
      const response = await store.getSession(props.SessionId);
      if (response.status == 200) {
        let fetchedSession = response.data;
        Object.assign(Session, fetchedSession);
      }
    } catch (error) {
      console.error("Error al cargar sesión:", error);
    }
  }
});

const submitForm = async () => {
  validateAllFields();
  const payload = {
    ...Session,
    expiration: `${Session.expiration} 00:00:00`
  }
  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessFACode.value = "";

  try {
    let response;
    if (props.SessionId) {
      response = await store.editSession(props.SessionId, payload);
    } else {
      response = await store.addSession(payload);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.SessionId ? 'Sesión actualizada con éxito ✅' : 'Sesión creada con éxito ✅',
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
    router.push('/sessions');
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.SessionId ? "Editar sesión" : "Crear sesión" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Lista desplegable de usuarios -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Usuario:</label>
          <select v-model="Session.user_id"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option disabled value="">Seleccione un usuario</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} ({{ user.email }})</option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.user">{{ errors.user }}</span>
        </div>
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Token:</label>
          <input v-model="Session.token" type="text" @input="validateField('token')" @blur="validateField('token')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.token">{{ errors.token }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Expiración:</label>
          <input v-model="Session.expiration" type="date" @input="validateField('expiration')"
            @blur="validateField('expiration')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.expiration">{{ errors.expiration }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Código:</label>
          <input v-model="Session.FACode" type="text" @input="validateField('FACode')" @blur="validateField('FACode')"
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
