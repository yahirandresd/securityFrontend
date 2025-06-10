<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Editar Dispositivo</h2>

      <div v-if="loading" class="text-center text-gray-600">Cargando dispositivo...</div>
      <div v-else>
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <!-- Lista desplegable de usuarios -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <select
              v-model="devise.user_id"
              required
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option disabled value="">Seleccione un usuario</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }} (ID: {{ user.id }})
              </option>
            </select>
          </div>

          <!-- Campo Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              v-model="devise.name"
              required
              type="text"
              placeholder="Ej. Servidor Principal"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <!-- Campo IP -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">IP</label>
            <input
              v-model="devise.ip"
              required
              type="text"
              placeholder="192.168.1.10"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <!-- Campo Sistema Operativo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sistema Operativo</label>
            <input
              v-model="devise.operating_system"
              required
              type="text"
              placeholder="Ubuntu 22.04, Windows 11..."
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <!-- Botón de actualización -->
          <button
            type="submit"
            class="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Actualizar Dispositivo
          </button>
        </form>

        <!-- Mensajes -->
        <div class="mt-4 text-center">
          <p v-if="success" class="text-green-600 font-medium">{{ success }}</p>
          <p v-if="error" class="text-red-600 font-medium">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { Devise } from '@/models/Devise'

interface User {
  id: number
  name: string
}

const route = useRoute()
const id = Number(route.params.id)

const devise = ref<Devise>({
  id,
  name: '',
  ip: '',
  operating_system: '',
  user_id: undefined as unknown as number
})

const users = ref<User[]>([])
const loading = ref(true)
const error = ref('')
const success = ref('')
const API_URL = import.meta.env.VITE_API_URL

const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/user`)
    users.value = res.data
  } catch {
    error.value = '❌ Error al cargar usuarios'
  }
}

const fetchDevise = async () => {
  try {
    const res = await axios.get<Devise>(`${API_URL}/devise/${id}`)
    devise.value = res.data
  } catch (err) {
    error.value = '❌ Error al cargar el dispositivo'
  } finally {
    loading.value = false
  }
}

const handleUpdate = async () => {
  try {
    await axios.put(`${API_URL}/devise/${id}`, devise.value)
    success.value = '✅ Dispositivo actualizado correctamente'
    error.value = ''
  } catch (err) {
    error.value = '❌ Error al actualizar el dispositivo'
    success.value = ''
  }
}

onMounted(async () => {
  await fetchUsers()
  await fetchDevise()
})
</script>
