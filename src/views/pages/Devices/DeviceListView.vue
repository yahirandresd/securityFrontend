<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Dispositivos</h1>

      <router-link
        to="/devices/create"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Dispositivo
      </router-link>

      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300 text-sm text-gray-700">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-3 border">Nombre</th>
              <th class="px-4 py-3 border">IP</th>
              <th class="px-4 py-3 border">Sistema Operativo</th>
              <th class="px-4 py-3 border">Usuario</th>
              <th class="px-4 py-3 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="devices.length === 0">
              <td colspan="5" class="px-4 py-4 text-center text-gray-500">
                No hay dispositivos registrados.
              </td>
            </tr>
            <tr v-for="d in devices" :key="d.id" class="hover:bg-gray-100">
              <td class="px-4 py-3 border">{{ d.name }}</td>
              <td class="px-4 py-3 border">{{ d.ip }}</td>
              <td class="px-4 py-3 border">{{ d.operating_system }}</td>
              <td class="px-4 py-3 border">{{ d.user_id || 'No asignado' }}</td>
              <td class="px-4 py-3 border">
                <div class="flex flex-wrap gap-2">
                  <router-link
                    :to="`/devices/${d.id}`"
                    class="text-green-600 hover:text-green-800 flex items-center"
                  >
                    <EyeIcon class="w-4 h-4 mr-1" /> Ver
                  </router-link>
                  <router-link
                    :to="`/devices/update/${d.id}`"
                    class="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <PencilIcon class="w-4 h-4 mr-1" /> Editar
                  </router-link>
                  <button
                    @click="deleteDevice(d.id)"
                    class="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <TrashIcon class="w-4 h-4 mr-1" /> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="error" class="text-red-600 mt-4">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next'

interface Device {
  id: number
  name: string
  ip: string
  operating_system: string
  user_id?: number
}

const devices = ref<Device[]>([])
const error = ref('')
const API_URL = import.meta.env.VITE_API_URL + `/devices`

const fetchDevices = async () => {
  try {
    const res = await axios.get<Device[]>(API_URL)
    devices.value = res.data
  } catch {
    error.value = 'Error al cargar los dispositivos'
  }
}

const deleteDevice = async (id: number) => {
  if (!confirm('¿Deseas eliminar este dispositivo?')) return
  try {
    await axios.delete(`${API_URL}/${id}`)
    devices.value = devices.value.filter(d => d.id !== id)
  } catch {
    error.value = 'No se pudo eliminar el dispositivo'
  }
}

onMounted(fetchDevices)
</script>
