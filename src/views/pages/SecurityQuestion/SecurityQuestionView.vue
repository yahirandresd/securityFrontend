<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Detalle de la Pregunta de Seguridad</h1>

      <div v-if="question" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-bold mb-2">ID</label>
          <p class="text-gray-600">{{ question.id }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Nombre</label>
          <p class="text-gray-600">{{ question.name }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Descripción</label>
          <p class="text-gray-600">{{ question.description || 'Sin descripción' }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        <p>No se encontró la pregunta de seguridad.</p>
      </div>

      <div class="flex justify-end mt-6">
        <router-link
          to="/security-questions"
          class="inline-flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <ChevronLeftIcon class="w-5 h-5 mr-2" />
          Volver
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ChevronLeftIcon } from 'lucide-vue-next'

export interface SecurityQuestion {
  id: number
  name: string
  description: string
}

const route = useRoute()
const question = ref<SecurityQuestion | null>(null)
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/security-questions'

const fetchQuestion = async () => {
  try {
    const res = await axios.get<SecurityQuestion>(`${API_URL}/${route.params.id}`)
    question.value = res.data
  } catch {
    error.value = 'No se encontró la pregunta de seguridad.'
  }
}

onMounted(fetchQuestion)
</script>
