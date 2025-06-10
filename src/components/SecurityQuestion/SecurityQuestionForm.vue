<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.questionId ? "Editar Pregunta de Seguridad" : "Crear Pregunta de Seguridad" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-6">
        <!-- Nombre de la pregunta -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            v-model="question.name"
            @input="validateField('name')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <!-- Descripción -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea
            v-model="question.description"
            @input="validateField('description')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows="3"
          ></textarea>
          <span class="text-red-500 text-sm" v-if="errors.description">{{ errors.description }}</span>
        </div>

        <!-- Botón de envío -->
        <div>
          <button
            type="submit"
            :disabled="Object.keys(errors).length > 0 || isSubmitting"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {{ isSubmitting ? "Enviando..." : props.questionId ? "Actualizar" : "Crear" }}
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

import { useSecurityQuestionStore } from '@/store/SecurityQuestionsStore'
import { SecurityQuestionValidator } from '@/utils/SecurityQuestionValidator'

const props = defineProps<{ questionId?: number }>()
const router = useRouter()
const store = useSecurityQuestionStore()

const question = reactive({
  id: 0,
  name: '',
  description: '',
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

onMounted(async () => {
  if (props.questionId) {
    try {
      const res = await store.getSecurityQuestion(props.questionId)
      if (res.status === 200) {
        Object.assign(question, res.data)
      }
    } catch (error) {
      console.error('Error al cargar la pregunta:', error)
    }
  }
})

const validateField = (field: keyof typeof question) => {
  const result = SecurityQuestionValidator.validateField(field, question[field])
  if (!result.success) {
    errors[field] = result.error.errors[0].message
  } else {
    delete errors[field]
  }
}

const validateAllFields = () => {
  Object.keys(question).forEach((field) => {
    validateField(field as keyof typeof question)
  })
}

const submitForm = async () => {
  validateAllFields()
  if (Object.keys(errors).length > 0) return

  isSubmitting.value = true
  try {
    let res
    if (props.questionId) {
      res = await store.editSecurityQuestion(props.questionId, question)
    } else {
      res = await store.addSecurityQuestion(question)
    }

    if ([200, 201].includes(res.status)) {
      Swal.fire({
        title: 'Éxito',
        text: props.questionId ? 'Pregunta actualizada ✅' : 'Pregunta creada ✅',
        icon: 'success',
        timer: 3000,
        confirmButtonText: 'OK',
      })
      router.push('/security-questions')
    } else {
      Swal.fire({
        title: 'Error',
        text: `❌ Código ${res.status}: ${res.data?.message || 'Ocurrió un error'}`,
        icon: 'error',
        timer: 3000,
        confirmButtonText: 'Intentar de nuevo',
      })
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: '❌ Error inesperado en la operación.',
      icon: 'error',
      timer: 3000,
      confirmButtonText: 'OK',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
