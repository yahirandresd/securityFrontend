<template>
  <div class="answer-list">
    <h2>Lista de Respuestas</h2>

    <div v-if="loading">Cargando respuestas...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="answer in answers" :key="answer.id">
        <strong>ID:</strong> {{ answer.id }} — <strong>Contenido:</strong> {{ answer.content }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Answer } from '@/models/Answer'

const answers = ref<Answer[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const API_URL = import.meta.env.VITE_API_URL + '/answer'

const fetchAnswers = async () => {
  try {
    const response = await axios.get<Answer[]>(API_URL)
    answers.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'No se pudieron cargar las respuestas.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchAnswers)
</script>

<style scoped>
.answer-list {
  max-width: 600px;
  margin: 20px auto;
}

.error {
  color: red;
}
</style>
