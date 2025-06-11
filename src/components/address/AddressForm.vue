<script setup lang="ts">
import { useAddressStore } from '@/store/AddressStore';
import { useUserStore } from '@/store/UserStore';
import { AddressValidator } from '@/utils/AddressValidators';
import Swal from 'sweetalert2';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '@/models/User'; // Asegúrate que este path sea correcto


const props = defineProps<{ addressId?: number }>();

const address = reactive({
    street: '',
    number: '',
    latitude: null,
    longitude: null,
    user_id: null // Asumiendo que el address tiene un campo userId
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref('');
const store = useAddressStore();
const router = useRouter();

const users = ref<User[]>([]);
const userStore = useUserStore(); // si ya tienes un store de usuarios

const loadUsers = async () => {
  try {
    const response = await userStore.getUsers(); // o como se llame tu método del store
    users.value = response;
    console.log('Usuarios cargados:', users.value);
  } catch (error) {
    console.error('Error cargando usuarios:', error);
  }
};


const validateField = (field: keyof typeof address) => {
    const result = AddressValidator.validateField(field, address[field]);

    if (!result.success) {
        errors[field] = result.error.errors[0].message;
    } else {
        delete errors[field]; // Borra el error si es válido
    }
};

const validateAllFields = () => {
    Object.keys(address).forEach((field) => {
        validateField(field as keyof typeof address);
    });
};

onMounted(async () => {
  await loadUsers();

  if (props.addressId) {
    try {
      const response = await store.getAddress(props.addressId);
      if (response.status == 200) {
        Object.assign(address, response.data);
      }
    } catch (error) {
      console.error("Error al cargar address:", error);
    }
  }
});


const submitForm = async () => {
    validateAllFields();

    if (Object.keys(errors).length > 0) return;

    isSubmitting.value = true;
    successMessage.value = '';

    try {
        let response;
        if (props.addressId) {
            response = await store.editAddress(props.addressId, address);
        } else {
            response = await store.addAddress(address);
        }

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                title: 'Éxito',
                text: props.addressId ? 'Address actualizado con éxito ✅' : 'Usuario creado con éxito ✅',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 3000
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: `❌ Código ${response.status}: ${response.data?.message || 'Ocurrió un error'}`,
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo',
                timer: 3000
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: '❌ Error inesperado en la operación.',
            icon: 'error',
            confirmButtonText: 'OK',
            timer: 3000
        });
    } finally {
        isSubmitting.value = false;
    }
    router.push('/addresses');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <div class="w-full bg-white shadow-lg rounded-lg p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                {{ props.addressId ? 'Editar Address' : 'Crear Address' }}
            </h2>

            <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Usuario:</label>
                    <select v-model="address.user_id" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option disabled value="">Seleccione un usuario</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} ({{ user.email }})</option>
                    </select>
                    <span class="text-red-500 text-sm" v-if="errors.user">{{ errors.user }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Calle:</label>
                    <input v-model="address.street" type="text" @input="validateField('street')" @blur="validateField('street')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.street">{{ errors.street }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Numero:</label>
                    <input v-model="address.number" type="text" @input="validateField('number')" @blur="validateField('number')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.number">{{ errors.number }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Latitud:</label>
                    <input v-model="address.latitude" type="number" @input="validateField('latitude')" @blur="validateField('latitude')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.latitude">{{ errors.latitude }}</span>
                </div>

                <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700">Longitud:</label>
                    <input v-model="address.longitude" type="number" @input="validateField('longitude')" @blur="validateField('longitude')" class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.longitude">{{ errors.longitude }}</span>
                </div>

                <div class="col-span-1 md:col-span-2">
                    <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting" class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                        {{ isSubmitting ? 'Enviando...' : props.addressId ? 'Actualizar' : 'Crear' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
