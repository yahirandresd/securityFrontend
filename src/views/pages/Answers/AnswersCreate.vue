<template>
  <div class="answer-create">
    <h2>Crear Respuesta</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="content">Contenido</label>
        <input
          type="text"
          id="content"
          v-model="answer.content"
          required
        />
      </div>

      <button type="submit">Crear</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import { Answer } from '@/models/Answer'

const answer = ref<Omit<Answer, 'id'>>({
  content: '',
})

const successMessage = ref('')
const errorMessage = ref('')

const API_URL = import.meta.env.VITE_API_URL + '/answer'

const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  try {
    const response = await axios.post<Answer>(API_URL, answer.value)
    successMessage.value = 'Respuesta creada con éxito (ID: ' + response.data.id + ')'
    answer.value.content = ''
  } catch (error) {
    errorMessage.value = 'Error al crear la respuesta.'
    console.error(error)
  }
}
</script>

<style scoped>
.answer-create {
  max-width: 400px;
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
