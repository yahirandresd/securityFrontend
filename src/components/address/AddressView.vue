<template>
  <div class="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Detalles de la Dirección</h2>

    <div v-if="address">
      <p><strong>ID:</strong> {{ address.id }}</p>
      <p><strong>Usuario ID:</strong> {{ address.user_id }}</p>
      <p><strong>Calle:</strong> {{ address.street }}</p>
      <p><strong>Número:</strong> {{ address.number }}</p>
      <p><strong>Latitud:</strong> {{ address.latitude }}</p>
      <p><strong>Longitud:</strong> {{ address.longitude }}</p>

      <div class="mt-6 flex gap-4">
        <router-link
          :to="`/addresses/update/${address.id}`"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Actualizar
        </router-link>
        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>

    <div v-else>
      <p>Cargando dirección...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import AddressService from '@/service/AddressService';
import type { Address } from '@/models/Address';

const address = ref<Address | null>(null);
const route = useRoute();
const router = useRouter();

const loadAddress = async () => {
  const id = Number(route.params.id);
  const response = await AddressService.getAddress(id);
  address.value = response.data;
};

const confirmDelete = async () => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¡Esta acción no se puede deshacer!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });

  if (result.isConfirmed && address.value) {
    try {
      await AddressService.deleteAddress(address.value.id);
      await Swal.fire('¡Eliminado!', 'La dirección ha sido eliminada.', 'success');
      router.push('/addresses');
    } catch (error) {
      await Swal.fire('Error', 'No se pudo eliminar la dirección.', 'error');
    }
  }
};

onMounted(loadAddress);
</script>
