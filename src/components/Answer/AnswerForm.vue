<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.answerId ? "Editar Respuesta de Seguridad" : "Crear Respuesta de Seguridad" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Contenido de la respuesta -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Respuesta:</label>
          <input type="text" v-model="answer.content" @input="validateField('content')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.content">{{ errors.content }}</span>
        </div>

        <!-- Selección de Pregunta de Seguridad -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Pregunta de Seguridad:</label>
          <select v-model="answer.security_question_id" @change="validateField('security_question_id')"
            class="w-full p-2 border border-gray-300 rounded-lg">
            <option disabled value="">Seleccione una pregunta</option>
            <option v-for="q in questions" :key="q.id" :value="q.id">
              {{ q.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.security_question_id">{{ errors.security_question_id }}</span>
        </div>
        <!-- Selección de Usuario -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Usuario:</label>
          <select v-model="answer.user_id" @change="validateField('user_id')"
            class="w-full p-2 border border-gray-300 rounded-lg">
            <option disabled value="">Seleccione un usuario</option>
            <option v-for="u in users" :key="u.id" :value="u.id">
              {{ u.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
        </div>

        <!-- Botón de Envío -->
        <div class="md:col-span-2">
          <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
            {{ isSubmitting ? "Enviando..." : props.answerId ? "Actualizar" : "Crear" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import { useAnswerStore } from '@/store/AnswerStore'
import { useUserStore } from '@/store/UserStore'
import { useSecurityQuestionStore } from '@/store/SecurityQuestionsStore'

import { AnswerValidator } from '@/utils/AnswerValidator'
import type { User } from '@/models/User'
import type { SecurityQuestion } from '@/models/SecurityQuestion'

const props = defineProps<{ answerId?: number }>()

const router = useRouter()
const answerStore = useAnswerStore()
const userStore = useUserStore()
const questionStore = useSecurityQuestionStore()

const answer = reactive({
  content: '',
  security_question_id: null,
  user_id: null,
})

const users = ref<User[]>([])
const questions = ref<SecurityQuestion[]>([])
const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

onMounted(async () => {
  await userStore.getUsers()
  users.value = userStore.users

  await questionStore.fetchQuestions()
  questions.value = questionStore.questions

  if (props.answerId) {
    const res = await answerStore.getAnswer(props.answerId)
    const a = res.data
    answer.id = a.id
    answer.content = a.content
    answer.security_question_id = a.security_question_id
    answer.user_id = a.user_id
  }
})

const validateField = (field: keyof typeof answer) => {
  const result = AnswerValidator.validateField(field, answer[field])
  if (!result.success) {
    errors[field] = result.error.errors[0].message
  } else {
    delete errors[field]
  }
}

const validateAllFields = () => {
  Object.keys(answer).forEach((field) => {
    validateField(field as keyof typeof answer)
  })
}

const submitForm = async () => {
  validateAllFields()
  if (Object.keys(errors).length > 0) return

  isSubmitting.value = true
  try {
    let res
    if (props.answerId) {
      res = await answerStore.editAnswer(props.answerId, answer)
    } else {
      res = await answerStore.addAnswer(answer)
    }

    if ([200, 201].includes(res.status)) {
      Swal.fire({
        title: 'Éxito',
        text: props.answerId ? 'Respuesta actualizada ✅' : 'Respuesta creada ✅',
        icon: 'success',
        timer: 3000,
      })
      router.push('/answers')
    } else {
      Swal.fire({
        title: 'Error',
        text: `❌ Código ${res.status}: ${res.data?.message || 'Ocurrió un error'}`,
        icon: 'error',
        timer: 3000,
      })
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: '❌ Error inesperado en la operación.',
      icon: 'error',
      timer: 3000,
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
