<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Crear Firma Digital</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Lista desplegable de usuarios -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <select
            v-model="signature.user_id"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option disabled value="">Seleccione un usuario</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }} (ID: {{ user.id }})
            </option>
          </select>
        </div>

        <!-- Campo de archivo (foto) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Foto</label>
          <div class="flex">
            <input
              type="text"
              :value="photoName"
              disabled
              placeholder="Ruta del archivo..."
              class="flex-grow px-4 py-2 border rounded-l-lg bg-gray-100"
            />
            <button
              type="button"
              @click="triggerFileInput"
              class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 rounded-r-lg"
            >
              Browse...
            </button>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleFileChange"
          />
        </div>

        <!-- Botón de envío -->
        <button
          type="submit"
          class="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Guardar Firma Digital
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

interface User {
  id: number
  name: string
}

const users = ref<User[]>([])
const photoFile = ref<File | null>(null)
const photoName = ref('')

const signature = ref({
  user_id: undefined as unknown as number
})

const fileInput = ref<HTMLInputElement | null>(null)
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

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    photoFile.value = file
    photoName.value = file.name
  }
}

const handleSubmit = async () => {
  if (!photoFile.value || !signature.value.user_id) {
    error.value = '❌ Todos los campos son obligatorios'
    success.value = ''
    return
  }

  const formData = new FormData()
  formData.append('photo', photoFile.value)
  formData.append('user_id', signature.value.user_id.toString())

  try {
    await axios.post(`${API_URL}/digital-signature`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    success.value = '✅ Firma digital creada exitosamente'
    error.value = ''
    photoName.value = ''
    photoFile.value = null
    signature.value.user_id = undefined as unknown as number
  } catch {
    error.value = '❌ Error al crear la firma digital'
    success.value = ''
  }
}

onMounted(fetchUsers)
</script>
