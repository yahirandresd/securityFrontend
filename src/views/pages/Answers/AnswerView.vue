<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Detalle de la Respuesta de Seguridad</h1>

      <div v-if="answer" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-bold mb-2">ID</label>
          <p class="text-gray-600">{{ answer.id }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Contenido</label>
          <p class="text-gray-600">{{ answer.content || 'Sin respuesta' }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">ID de Pregunta de Seguridad</label>
          <p class="text-gray-600">{{ answer.security_question_id ?? 'No asignada' }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Usuario</label>
          <p class="text-gray-600">{{ answer.user_id ?? 'No asignado' }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        <p>No se encontró la respuesta.</p>
      </div>

      <div class="flex justify-end mt-6">
        <router-link
          to="/answers"
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

export interface Answer {
  id?: number
  content?: string
  security_question_id?: number
  user_id?: number
}

const route = useRoute()
const answer = ref<Answer | null>(null)
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/answers'

const fetchAnswer = async () => {
  try {
    const res = await axios.get<Answer>(`${API_URL}/${route.params.id}`)
    answer.value = res.data
  } catch {
    error.value = 'No se encontró la respuesta.'
  }
}

onMounted(fetchAnswer)
</script>
