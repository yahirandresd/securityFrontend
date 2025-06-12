<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const modules = [
  {
    label: 'Amarillo',
    color: 'bg-yellow-100',
    items: [
      { label: 'User Roles', icon: 'pi pi-users', to: '/user-roles' },
      { label: 'Users', icon: 'pi pi-user', to: '/users' },
      { label: 'Address', icon: 'pi pi-address-book', to: '/addresses' },
      { label: 'Passwords', icon: 'pi pi-key', to: '/passwords' },
      { label: 'Roles', icon: 'pi pi-shield', to: '/roles' },
    ],
  },
  {
    label: 'Azul',
    color: 'bg-blue-100',
    items: [
      { label: 'Permissions', icon: 'pi pi-lock', to: '/permissions' },
      { label: 'Sessions', icon: 'pi pi-clock', to: '/sessions' },
      { label: 'Profiles', icon: 'pi pi-id-card', to: '/profiles' },
      { label: 'RolePermissions', icon: 'pi pi-shield', to: '/rolepermissions' },
    ],
  },
  {
    label: 'Verde',
    color: 'bg-green-100',
    items: [
      { label: 'Devices', icon: 'pi pi-tablet', to: '/devices' },
      { label: 'Signatures', icon: 'pi pi-pencil', to: '/signatures' },
      { label: 'SecurityQuestion', icon: 'pi pi-question-circle', to: '/security-questions' },
      { label: 'Answers', icon: 'pi pi-check-circle', to: '/answers' },
    ],
  },
];
</script>

<template>
  <div class="p-10 bg-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-10 text-gray-800">Bienvenido al Sistema de Seguridad</h1>

    <div v-for="section in modules" :key="section.label" class="mb-10">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">{{ section.label }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="mod in section.items"
          :key="mod.label"
          :class="`cursor-pointer rounded-xl shadow-md hover:shadow-xl transition duration-300 ${section.color}`"
          @click="router.push(mod.to)"
        >
          <div class="flex flex-col items-center justify-center p-6 h-40">
            <i :class="`${mod.icon} text-4xl mb-3 text-gray-800`"></i>
            <span class="text-lg font-medium text-gray-700">{{ mod.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi {
  transition: transform 0.3s;
}
.pi:hover {
  transform: scale(1.1);
}
</style>
