<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/Auth'; // Ajusta según tu store

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const token = route.query.token as string;

  if (token) {
    localStorage.setItem('token', token);
    authStore.setToken(token); // si tienes una acción en el store
    router.push('/'); // redirige al home
  }
});
</script>