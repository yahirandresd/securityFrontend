<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Detalle del Dispositivo</h1>

      <div v-if="device" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-bold mb-2">ID</label>
          <p class="text-gray-600">{{ device.id }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Nombre</label>
          <p class="text-gray-600">{{ device.name }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Dirección IP</label>
          <p class="text-gray-600">{{ device.ip }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Sistema Operativo</label>
          <p class="text-gray-600">{{ device.operating_system }}</p>
        </div>

        <div>
          <label class="block text-gray-700 font-bold mb-2">Usuario Asociado</label>
          <p class="text-gray-600">{{ device.user_id }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500">
        <p>No se encontró el dispositivo.</p>
      </div>

      <div class="flex justify-end mt-6">
        <router-link
          to="/devices"
          class="inline-flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          <ChevronLeftIcon class="w-5 h-5 mr-2" />
          Volver
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { ChevronLeftIcon } from 'lucide-vue-next'

export interface Device {
  id?: number
  name: string
  ip: string
  operating_system: string
  user_id: number
}

const route = useRoute()
const device = ref<Device | null>(null)
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + '/devices'

const fetchDevice = async () => {
  try {
    const res = await axios.get<Device>(`${API_URL}/${route.params.id}`)
    device.value = res.data
  } catch {
    error.value = 'No se encontró el dispositivo.'
  }
}

onMounted(fetchDevice)
</script>
