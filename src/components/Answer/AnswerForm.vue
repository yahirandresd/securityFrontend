<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.answerId ? "Editar Respuesta de Seguridad" : "Crear Respuesta de Seguridad" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Campo de Contenido -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Respuesta:</label>
          <input
            type="text"
            v-model="answer.content"
            @input="validateField('content')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-red-500 text-sm" v-if="errors.content">{{ errors.content }}</span>
        </div>

        <!-- Selección de Pregunta de Seguridad -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Pregunta de Seguridad:</label>
          <select
            v-model="answer.securityQuestion_id"
            @change="validateField('securityQuestion_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option disabled value="">Seleccione una pregunta</option>
            <option v-for="q in questions" :key="q.id" :value="q.id">
              {{ q.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.securityQuestion_id">{{ errors.securityQuestion_id }}</span>
        </div>

        <!-- Selección de Usuario -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Usuario:</label>
          <select
            v-model="answer.user_id"
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
            {{ isSubmitting ? "Enviando..." : props.answerId ? "Actualizar" : "Crear" }}
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

import { useAnswerStore } from '@/store/AnswerStore';
import { useUserStore } from '@/store/UserStore';
import { useSecurityQuestionStore } from '@/store/SecurityQuestionsStore'; // ✅ nombre corregido

import { User } from '@/models/User';
import { SecurityQuestion } from '@/models/SecurityQuestion';
import { AnswerValidator } from '@/utils/AnswerValidator';

const props = defineProps<{ answerId?: number }>();

const router = useRouter();
const answerStore = useAnswerStore();
const userStore = useUserStore();
const questionStore = useSecurityQuestionStore(); // ✅ uso corregido

const answer = reactive({
  id: 0,
  content: '',
  securityQuestion_id: 0,
  user_id: 0,
});

const users = ref<User[]>([]);
const questions = ref<SecurityQuestion[]>([]);
const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);

onMounted(async () => {
  try {
    await userStore.fetchUsers();
    users.value = userStore.users;

    await questionStore.fetchSecurityQuestions();
    questions.value = await questionStore.securityQuestions;

    if (props.answerId) {
      const response = await answerStore.getAnswer(props.answerId);
      if (response.status === 200) {
        Object.assign(answer, response.data);
      }
    }
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
});

const validateField = (field: keyof typeof answer) => {
  const result = AnswerValidator.validateField(field, answer[field]);
  if (!result.success) {
    errors[field] = result.error.errors[0].message;
  } else {
    delete errors[field];
  }
};

const validateAllFields = () => {
  Object.keys(answer).forEach((field) => {
    validateField(field as keyof typeof answer);
  });
};

const submitForm = async () => {
  validateAllFields();
  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;

  try {
    let response;
    if (props.answerId) {
      response = await answerStore.editAnswer(props.answerId, answer);
    } else {
      response = await answerStore.addAnswer(answer);
    }

    if ([200, 201].includes(response.status)) {
      Swal.fire({
        title: 'Éxito',
        text: props.answerId ? 'Respuesta actualizada con éxito ✅' : 'Respuesta creada con éxito ✅',
        icon: 'success',
        timer: 3000,
        confirmButtonText: 'OK',
      });
      router.push('/answers');
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
