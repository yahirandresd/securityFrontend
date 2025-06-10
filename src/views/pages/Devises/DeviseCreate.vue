<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Dispositivo</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
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

        <!-- Botón de envío -->
        <button
          type="submit"
          class="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Guardar Dispositivo
        </button>
      </form>

      <!-- Mensajes de éxito o error -->
      <div class="mt-4 text-center">
        <p v-if="success" class="text-green-600 font-medium">{{ success }}</p>
        <p v-if="error" class="text-red-600 font-medium">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { Devise } from '@/models/Devise'

interface User {
  id: number
  name: string
}

const devise = ref<Omit<Devise, 'id'>>({
  name: '',
  ip: '',
  operating_system: '',
  user_id: undefined as unknown as number
})

const users = ref<User[]>([])
const success = ref('')
const error = ref('')

const API_URL = import.meta.env.VITE_API_URL

const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/user`)
    users.value = res.data
  } catch {
    error.value = '❌ Error al cargar usuarios'
  }
}

const handleSubmit = async () => {
  try {
    await axios.post(`${API_URL}/devise/user/${devise.value.user_id}`, devise.value)
    success.value = '✅ Dispositivo creado exitosamente'
    error.value = ''
    devise.value = { name: '', ip: '', operating_system: '', user_id: undefined as unknown as number }
  } catch {
    error.value = '❌ Error al crear el dispositivo'
    success.value = ''
  }
}

onMounted(fetchUsers)
</script>
