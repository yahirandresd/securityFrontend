<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Lista de Dispositivos</h1>
      <router-link
        to="/devises/create"
        class="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-4"
      >
        <PlusCircleIcon class="w-5 h-5 mr-2" />
        Crear Dispositivo
      </router-link>
      
      <!-- Tabla con altura automática -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300 text-sm text-gray-700">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-3 border border-gray-300 text-left font-medium">Nombre</th>
              <th class="px-4 py-3 border border-gray-300 text-left font-medium">IP</th>
              <th class="px-4 py-3 border border-gray-300 text-left font-medium">Sistema Operativo</th>
              <th class="px-4 py-3 border border-gray-300 text-left font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <!-- Fila para cuando no hay datos -->
            <tr v-if="devises.length === 0 && !isLoading">
              <td colspan="4" class="px-4 py-8 text-center text-gray-500 border border-gray-300">
                <div class="flex flex-col items-center">
                  <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <p>No hay dispositivos registrados.</p>
                </div>
              </td>
            </tr>
            
            <!-- Fila de carga -->
            <tr v-if="isLoading">
              <td colspan="4" class="px-4 py-8 text-center text-gray-500 border border-gray-300">
                <div class="flex justify-center items-center">
                  <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                  Cargando dispositivos...
                </div>
              </td>
            </tr>
            
            <!-- Filas de datos - solo se renderizan si existen -->
            <tr 
              v-for="d in devises" 
              :key="d.id" 
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-4 py-3 border border-gray-300">{{ d.nombre }}</td>
              <td class="px-4 py-3 border border-gray-300">
                <code class="bg-gray-100 px-2 py-1 rounded text-xs">{{ d.direccion_ip }}</code>
              </td>
              <td class="px-4 py-3 border border-gray-300">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ d.sistema }}
                </span>
              </td>
              <td class="px-4 py-3 border border-gray-300">
                <div class="flex flex-wrap gap-2">
                  <router-link
                    :to="`/devises/${d.id}`"
                    class="text-green-600 hover:text-green-800 flex items-center text-sm hover:underline"
                  >
                    <EyeIcon class="w-4 h-4 mr-1" /> Ver
                  </router-link>
                  <router-link
                    :to="`/devises/update/${d.id}`"
                    class="text-blue-600 hover:text-blue-800 flex items-center text-sm hover:underline"
                  >
                    <PencilIcon class="w-4 h-4 mr-1" /> Editar
                  </router-link>
                  <button
                    @click="deleteDevise(d.id)"
                    class="text-red-600 hover:text-red-800 flex items-center text-sm hover:underline"
                  >
                    <TrashIcon class="w-4 h-4 mr-1" /> Eliminar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Información adicional -->
      <div class="mt-4 text-sm text-gray-600">
        Total de dispositivos: {{ devises.length }}
      </div>
      
      <!-- Mensaje de error -->
      <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-red-800">{{ error }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-vue-next'

// Define la interfaz según los campos reales que recibes
interface Devise {
  id: number
  nombre: string
  direccion_ip: string
  sistema: string
}

const devises = ref<Devise[]>([])
const error = ref('')
const isLoading = ref(false)

const API_URL = import.meta.env.VITE_API_URL + '/devise'

const fetchDevises = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const res = await axios.get<Devise[]>(API_URL)
    console.log('Datos recibidos:', res.data)
    devises.value = res.data || [] // Asegura que siempre sea un array
  } catch (err) {
    console.error('Error al cargar dispositivos:', err)
    error.value = 'Error al cargar los dispositivos'
    devises.value = [] // Limpia el array en caso de error
  } finally {
    isLoading.value = false
  }
}

const deleteDevise = async (id: number) => {
  if (!confirm('¿Deseas eliminar este dispositivo?')) return
  
  try {
    await axios.delete(`${API_URL}/${id}`)
    devises.value = devises.value.filter(d => d.id !== id)
  } catch (err) {
    console.error('Error al eliminar dispositivo:', err)
    error.value = 'No se pudo eliminar el dispositivo'
  }
}

onMounted(fetchDevises)
</script>