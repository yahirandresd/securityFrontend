<template>
  <div class="map-container" ref="mapContainer" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import maplibregl from 'maplibre-gl'

const emit = defineEmits(['location-selected'])

const mapContainer = ref(null)
let map
let marker

onMounted(() => {
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: `https://api.maptiler.com/maps/streets/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`,
    center: [-75.5174, 5.0689], // Manizales
    zoom: 13
  })

  map.on('click', (e) => {
    const { lng, lat } = e.lngLat

    // Emitir coordenadas
    emit('location-selected', { lat, lng })

    // Quitar marcador anterior si existe
    if (marker) marker.remove()

    // Crear nuevo marcador
    marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map)
  })
})
</script>

<style scoped>
.map-container {
  width: 100%;
  max-width: 600px; /* o el tamaño que desees */
  height: 30vh;
  margin: 0 auto; /* centra horizontalmente */
  border-radius: 8px;
  overflow: hidden;
}

</style>
