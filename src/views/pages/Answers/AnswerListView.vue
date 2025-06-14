<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Respuestas</h1>

      <router-link
        to="/answers/create"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Respuesta
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 text-sm text-gray-700">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-3 border">ID</th>
              <th class="px-4 py-3 border">Contenido</th>
              <th class="px-4 py-3 border">Usuario</th>
              <th class="px-4 py-3 border">Pregunta</th>
              <th class="px-4 py-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="answers.length === 0">
              <td colspan="5" class="px-4 py-4 text-center text-gray-500">
                No hay respuestas registradas.
              </td>
            </tr>
            <tr v-for="a in answers" :key="a.id" class="hover:bg-gray-100">
              <td class="px-4 py-3 border">{{ a.id }}</td>
              <td class="px-4 py-3 border">{{ a.content }}</td>
              <td class="px-4 py-3 border">{{ a.user?.name || 'Sin usuario' }}</td>
              <td class="px-4 py-3 border">{{ a.securityQuestion?.name || 'Sin pregunta' }}</td>
              <td class="px-4 py-3 border">
                <div class="flex flex-wrap gap-2">
                  <router-link
                    :to="`/answers/${a.id}`"
                    class="text-green-600 hover:text-green-800 flex items-center"
                  >
                    <EyeIcon class="w-4 h-4 mr-1" /> Ver
                  </router-link>
                  <router-link
                    :to="`/answers/update/${a.id}`"
                    class="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <PencilIcon class="w-4 h-4 mr-1" /> Editar
                  </router-link>
                  <button
                    @click="deleteAnswer(a.id)"
                    class="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <TrashIcon class="w-4 h-4 mr-1" /> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next'

export interface Answer {
  id: number
  content: string
  user_id: number
  securityQuestion_id: number
  user?: {
    id: number
    name: string
  }
  securityQuestion?: {
    id: number
    name: string
  }
}

const answers = ref<Answer[]>([])
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/answers'

const fetchAnswers = async () => {
  try {
    const res = await axios.get<Answer[]>(API_URL)
    answers.value = res.data
  } catch {
    error.value = 'Error al cargar las respuestas'
  }
}

const deleteAnswer = async (id: number) => {
  if (!confirm('¿Deseas eliminar esta respuesta?')) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    answers.value = answers.value.filter(a => a.id !== id)
  } catch {
    error.value = 'No se pudo eliminar la respuesta'
  }
}

onMounted(fetchAnswers)
</script>

