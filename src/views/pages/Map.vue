<template>
  <div class="p-4">
    <MapSelector @location-selected="handleLocation" />
  </div>
</template>

<script setup>
import MapSelector from '@/components/MapSelector.vue'

function handleLocation({ lat, lng }) {
  console.log('Ubicación seleccionada desde el mapa:', lat, lng)
}
</script>
