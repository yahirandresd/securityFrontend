<template>
  <div class="devise-update">
    <h2>Editar Dispositivo</h2>

    <div v-if="loading">Cargando dispositivo...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <form v-else @submit.prevent="handleUpdate">
      <label>Nombre</label>
      <input v-model="devise.name" required />

      <label>IP</label>
      <input v-model="devise.ip" required />

      <label>Sistema Operativo</label>
      <input v-model="devise.operating_system" required />

      <button type="submit">Actualizar</button>
    </form>

    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Devise } from '@/models/Devise'

const route = useRoute()
const id = Number(route.params.id)

const devise = ref<Devise>({
  id,
  name: '',
  ip: '',
  operating_system: ''
})

const loading = ref(true)
const error = ref('')
const success = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/devise'

const fetchDevise = async () => {
  try {
    const res = await axios.get<Devise>(`${API_URL}/${id}`)
    devise.value = res.data
  } catch (err) {
    error.value = 'Error al cargar dispositivo'
  } finally {
    loading.value = false
  }
}

const handleUpdate = async () => {
  try {
    await axios.put(`${API_URL}/${id}`, devise.value)
    success.value = 'Dispositivo actualizado con éxito'
  } catch (err) {
    error.value = 'Error al actualizar'
  }
}

onMounted(fetchDevise)
</script>

<style scoped>
.success { color: green; }
.error { color: red; }
</style>
