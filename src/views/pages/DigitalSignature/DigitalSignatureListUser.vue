<script setup lang="ts">
import { useDigitalSignatureStore } from '@/store/DigitalSignatureStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const digitalSignatureStore = useDigitalSignatureStore();
const route = useRoute();

onMounted(async () => {
    const userId = Number(route.params.id);
    if (userId) {
        await digitalSignatureStore.fetchSignaturesByUser(userId);
    }
});
</script>

<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6 text-center">Firmas Digitales del Usuario</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-purple-100">
                        <th class="py-3 px-6 border-b text-center font-semibold">Foto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(signature, idx) in digitalSignatureStore.signatures" :key="signature.id"
                        :class="idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'">
                        <td class="py-3 px-6 border-b text-center">
                            <img v-if="signature.photo"
                                :src="typeof signature.photo === 'string' ? signature.photo : URL.createObjectURL(signature.photo)"
                                alt="Firma" class="h-16 w-16 object-contain rounded mx-auto" />
                            <span v-else class="text-gray-400">Sin firma</span>
                        </td>
                    </tr>
                    <tr v-if="digitalSignatureStore.signatures.length === 0">
                        <td class="py-4 text-center text-gray-500">No hay firmas digitales registradas.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>