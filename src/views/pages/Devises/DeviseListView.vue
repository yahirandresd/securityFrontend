<template>
  <div class="devise-list">
    <h2>Lista de Dispositivos</h2>
    <div v-if="loading">Cargando...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <ul v-else>
      <li v-for="d in devises" :key="d.id">
        <strong>{{ d.name }}</strong> — {{ d.ip }} — {{ d.operating_system }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Devise } from '@/models/Devise'
import axios from 'axios'

const devises = ref<Devise[]>([])
const error = ref('')
const loading = ref(true)
const API_URL = import.meta.env.VITE_API_URL + '/devise'

const fetchDevises = async () => {
  try {
    const res = await axios.get<Devise[]>(API_URL)
    devises.value = res.data
  } catch (err) {
    error.value = 'Error al cargar los dispositivos'
  } finally {
    loading.value = false
  }
}

onMounted(fetchDevises)
</script>

<style scoped>
.error { color: red; }
</style>
