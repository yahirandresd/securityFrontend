<template>
  <div class="devise-create">
    <h2>Crear Dispositivo</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="devise.name" required />

        <label>IP</label>
        <input v-model="devise.ip" required />

        <label>Sistema Operativo</label>
        <input v-model="devise.operating_system" required />
      </div>

      <button type="submit">Guardar</button>
    </form>

    <p v-if="success" class="success">{{ success }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import type { Devise } from '@/models/Devise'

const devise = ref<Omit<Devise, 'id'>>({
  name: '',
  ip: '',
  operating_system: ''
})

const success = ref('')
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/devise'

const handleSubmit = async () => {
  try {
    await axios.post(API_URL, devise.value)
    success.value = 'Dispositivo creado exitosamente'
    devise.value = { name: '', ip: '', operating_system: '' }
  } catch (err) {
    error.value = 'Error al crear dispositivo'
  }
}
</script>

<style scoped>
.success { color: green; }
.error { color: red; }
</style>
