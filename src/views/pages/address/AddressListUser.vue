<script setup lang="ts">
import { useAddressStore } from '@/store/AddressStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const addressStore = useAddressStore();
const route = useRoute();

onMounted(async () => {
    // Obtener el id del usuario desde la ruta (parámetro 'id')
    const userId = Number(route.params.id);
    if (userId) {
        await addressStore.getAddressesByUser(userId);
    }
});
</script>

<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Direcciones del Usuario</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-blue-100">
                        <th class="py-3 px-6 border-b text-center font-semibold">Calle</th>
                        <th class="py-3 px-6 border-b text-center font-semibold">Número</th>
                        <th class="py-3 px-6 border-b text-center font-semibold">Latitud</th>
                        <th class="py-3 px-6 border-b text-center font-semibold">Longitud</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(address, idx) in addressStore.addresses" :key="address.id"
                        :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                        <td class="py-3 px-6 border-b text-center">{{ address.street }}</td>
                        <td class="py-3 px-6 border-b text-center">{{ address.number }}</td>
                        <td class="py-3 px-6 border-b text-center">{{ address.latitude }}</td>
                        <td class="py-3 px-6 border-b text-center">{{ address.longitude }}</td>
                    </tr>
                    <tr v-if="addressStore.addresses.length === 0">
                        <td colspan="4" class="py-4 text-center text-gray-500">No hay direcciones registradas.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
