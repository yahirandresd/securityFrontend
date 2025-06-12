<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GlobalLoader from '@/components/GlobalLoader.vue'

const loading = ref(false)
const router = useRouter()

router.beforeEach((to, from, next) => {
  loading.value = true
  next()
})

router.afterEach(() => {
  // Da un pequeño delay para que el loader no parpadee
  setTimeout(() => {
    loading.value = false
  }, 400)
})
</script>

<template>
  <GlobalLoader v-if="loading" />
  <router-view v-else />
</template>
