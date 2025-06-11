<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.deviceId ? "Editar Dispositivo" : "Crear Dispositivo" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Campo Nombre -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Nombre del dispositivo:</label>
          <input
            type="text"
            v-model="device.name"
            @input="validateField('name')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <!-- Campo IP -->
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Dirección IP:</label>
          <input
            type="text"
            v-model="device.ip"
            @input="validateField('ip')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-red-500 text-sm" v-if="errors.ip">{{ errors.ip }}</span>
        </div>

        <!-- Campo Sistema Operativo -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Sistema Operativo:</label>
          <input
            type="text"
            v-model="device.operating_system"
            @input="validateField('operating_system')"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <span class="text-red-500 text-sm" v-if="errors.operating_system">{{ errors.operating_system }}</span>
        </div>

        <!-- Selección de Usuario -->
        <div class="w-full md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Usuario asignado:</label>
          <select
            v-model="device.user_id"
            @change="validateField('user_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option disabled value="">Seleccione un usuario</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
          <span class="text-red-500 text-sm" v-if="errors.user_id">{{ errors.user_id }}</span>
        </div>

        <!-- Botón de envío -->
        <div class="col-span-1 md:col-span-2">
          <button
            type="submit"
            :disabled="Object.keys(errors).length > 0 || isSubmitting"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {{ isSubmitting ? "Enviando..." : props.deviceId ? "Actualizar" : "Crear" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import { useDeviceStore } from '@/store/DeviceStore'
import { useUserStore } from '@/store/UserStore'
import { DeviceValidator } from '@/utils/DeviceValidator'

import { User } from '@/models/User'

const props = defineProps<{ deviceId?: number }>()

const router = useRouter()
const deviceStore = useDeviceStore()
const userStore = useUserStore()

const device = reactive({
  id: 0,
  name: '',
  ip: '',
  operating_system: '',
  user_id: 0,
})

const users = ref<User[]>([])
const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)

onMounted(async () => {
  try {
    await userStore.fetchUsers()
    users.value = userStore.users

    if (props.deviceId) {
      const res = await deviceStore.getDevice(props.deviceId)
      if (res.status === 200) {
        Object.assign(device, res.data)
      }
    }
  } catch (error) {
    console.error('Error al cargar datos:', error)
  }
})

const validateField = (field: keyof typeof device) => {
  const result = DeviceValidator.validateField(field, device[field])
  if (!result.success) {
    errors[field] = result.error.errors[0].message
  } else {
    delete errors[field]
  }
}

const validateAllFields = () => {
  Object.keys(device).forEach((field) => {
    validateField(field as keyof typeof device)
  })
}

const submitForm = async () => {
  validateAllFields()
  if (Object.keys(errors).length > 0) return

  isSubmitting.value = true

  try {
    let res
    if (props.deviceId) {
      res = await deviceStore.editDevice(props.deviceId, device)
    } else {
      res = await deviceStore.addDevice(device)
    }

    if ([200, 201].includes(res.status)) {
      Swal.fire({
        title: 'Éxito',
        text: props.deviceId ? 'Dispositivo actualizado con éxito ✅' : 'Dispositivo creado con éxito ✅',
        icon: 'success',
        timer: 3000,
        confirmButtonText: 'OK',
      })
      router.push('/devices')
    } else {
      Swal.fire({
        title: 'Error',
        text: `❌ Código ${res.status}: ${res.data?.message || 'Ocurrió un error'}`,
        icon: 'error',
        timer: 3000,
        confirmButtonText: 'Intentar de nuevo',
      })
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: '❌ Error inesperado en la operación.',
      icon: 'error',
      timer: 3000,
      confirmButtonText: 'OK',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
