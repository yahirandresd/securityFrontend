<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Preguntas de Seguridad</h1>

      <router-link
        to="/security-questions/create"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Pregunta
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 text-sm text-gray-700">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-3 border">Nombre</th>
              <th class="px-4 py-3 border">Descripción</th>
              <th class="px-4 py-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="questions.length === 0">
              <td colspan="3" class="px-4 py-4 text-center text-gray-500">
                No hay preguntas registradas.
              </td>
            </tr>
            <tr v-for="q in questions" :key="q.id" class="hover:bg-gray-100">
              <td class="px-4 py-3 border">{{ q.name }}</td>
              <td class="px-4 py-3 border">{{ q.description }}</td>
              <td class="px-4 py-3 border">
                <div class="flex flex-wrap gap-2">
                  <router-link
                    :to="`/security-questions/${q.id}`"
                    class="text-green-600 hover:text-green-800 flex items-center"
                  >
                    <EyeIcon class="w-4 h-4 mr-1" /> Ver
                  </router-link>
                  <router-link
                    :to="`/security-questions/update/${q.id}`"
                    class="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <PencilIcon class="w-4 h-4 mr-1" /> Editar
                  </router-link>
                  <button
                    @click="deleteQuestion(q.id)"
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

interface SecurityQuestion {
  id: number
  name: string
  description: string
}

const questions = ref<SecurityQuestion[]>([])
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/security-question'

const fetchQuestions = async () => {
  try {
    const res = await axios.get<SecurityQuestion[]>(API_URL)
    questions.value = res.data
  } catch {
    error.value = 'Error al cargar las preguntas de seguridad'
  }
}

const deleteQuestion = async (id: number) => {
  if (!confirm('¿Deseas eliminar esta pregunta?')) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    questions.value = questions.value.filter(q => q.id !== id)
  } catch {
    error.value = 'No se pudo eliminar la pregunta'
  }
}

onMounted(fetchQuestions)
</script>
