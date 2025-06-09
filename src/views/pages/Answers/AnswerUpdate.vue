<template>
  <div class="answer-update">
    <h2>Editar Respuesta</h2>

    <div v-if="loading">Cargando respuesta...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <form v-else @submit.prevent="handleUpdate">
      <div class="form-group">
        <label for="content">Contenido</label>
        <input
          id="content"
          type="text"
          v-model="answer.content"
          required
        />
      </div>

      <button type="submit">Actualizar</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Answer } from '@/models/Answer'

const route = useRoute()
const id = Number(route.params.id)

const answer = ref<Answer>({ id, content: '' })
const loading = ref(true)
const error = ref<string | null>(null)
const successMessage = ref('')

const API_URL = import.meta.env.VITE_API_URL + '/answer'

const fetchAnswer = async () => {
  try {
    const response = await axios.get<Answer>(`${API_URL}/${id}`)
    answer.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'Error al cargar la respuesta.'
  } finally {
    loading.value = false
  }
}

const handleUpdate = async () => {
  try {
    await axios.put(`${API_URL}/${id}`, { content: answer.value.content })
    successMessage.value = 'Respuesta actualizada con éxito.'
  } catch (err) {
    console.error(err)
    error.value = 'Error al actualizar la respuesta.'
  }
}

onMounted(fetchAnswer)
</script>

<style scoped>
.answer-update {
  max-width: 500px;
  margin: 20px auto;
}

.form-group {
  margin-bottom: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
