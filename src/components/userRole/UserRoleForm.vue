<script setup lang="ts">
import { UserRoleValidator } from "@/utils/UserRoleValidator";
import { useUserRoleStore } from '@/store/UserRoleStore';
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ userRoleId?: string }>();

const userRole = reactive({
    userId: null,
    roleId: null,
    startAd: null,
    endAd: null,
});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");
const store = useUserRoleStore(); // Asegúrate de importar y usar el store correcto
const router = useRouter();

const validateField = (field: keyof typeof userRole) => {
  const result = UserRoleValidator.validateField(field, userRole[field]);

  if (!result.success) {
    errors[field] = result.error.errors[0].message;
  } else {
    delete errors[field]; // Borra el error si es válido
  }
};

const validateAllFields = () => {
  Object.keys(userRole).forEach((field) => {
    validateField(field as keyof typeof userRole);
  });
};

// Cargar UserRole si se pasa un userRoleId
onMounted(async () => {
  if (props.userRoleId) {
    try {
      const response = await store.getUserRole(props.userRoleId);
      if (response.status == 200) {
        let fetchedUserRole = response.data;
        Object.assign(userRole, fetchedUserRole);
      }
    } catch (error) {
      console.error("Error al cargar UserRole:", error);
    }
  }
});

const submitForm = async () => {
  validateAllFields();

  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessage.value = "";

  try {
    let response;
    if (props.userRoleId) {
      response = await store.editUserRole(props.userRoleId, userRole);
    } else {
      response = await store.addUserRole(userRole);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.userRoleId ? 'User Rol actualizado con éxito ✅' : 'User Rol creado con éxito ✅',
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
  router.push('/user-roles');
};
</script>

<template>
  <div class="user-role-form">
    <h2>{{ userRoleId ? 'Editar User Role' : 'Crear User Role' }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="userId">User ID</label>
        <input type="number" v-model="userRole.userId" @blur="validateField('userId')" />
        <span class="error" v-if="errors.userId">{{ errors.userId }}</span>
      </div>

      <div class="form-group">
        <label for="roleId">Role ID</label>
        <input type="number" v-model="userRole.roleId" @blur="validateField('roleId')" />
        <span class="error" v-if="errors.roleId">{{ errors.roleId }}</span>
      </div>

      <div class="form-group">
        <label for="startAd">Start Date</label>
        <input type="date" v-model="userRole.startAd" @blur="validateField('startAd')" />
        <span class="error" v-if="errors.startAd">{{ errors.startAd }}</span>
      </div>

      <div class="form-group">
        <label for="endAd">End Date</label>
        <input type="date" v-model="userRole.endAd" @blur="validateField('endAd')" />
        <span class="error" v-if="errors.endAd">{{ errors.endAd }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Guardando...' : 'Guardar' }}</button>
    </form>
    <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
  </div>
