<script setup lang="ts">
import { useRolePermissionStore } from '@/store/RolePermissionStore';
import { RolePermissionValidator } from "@/utils/RolePermissionValidator";
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router';

const props = defineProps<{ RolePermissionId?: number }>();

const RolePermission = reactive({
            role_id: null;
            permission_id: null;

});

const errors = reactive<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessFACode = ref("");
const store = useRolePermissionStore();
const router = useRouter();

const validateField = (field: keyof typeof RolePermission) => {
  const result = RolePermissionValidator.validateField(field, RolePermission[field]);

  if (!result.success) {
    errors[field] = result.error.errors[0].messFACode;
  } else {
    delete errors[field]; // Borra el error si es válido
  }
};

const validateAllFields = () => {
  Object.keys(RolePermission).forEach((field) => {
    validateField(field as keyof typeof RolePermission);
  });
};

// Cargar rolpermiso si se pasa un RolePermissionId
onMounted(async () => {
  if (props.RolePermissionId) {
    try {
      const response = await store.getRolePermission(props.RolePermissionId);
      if (response.status == 200) {
        let fetchedRolePermission = response.data
        Object.assign(RolePermission, fetchedRolePermission);
      }


    } catch (error) {
      console.error("Error al cargar rolpermiso:", error);
    }
  }
});

// Enviar formulario (crear o actualizar rolpermiso)
const submitForm = async () => {
  validateAllFields();

  if (Object.keys(errors).length > 0) return;

  isSubmitting.value = true;
  successMessFACode.value = "";

  try {
    let response;
    if (props.RolePermissionId) {
      response = await store.editRolePermission(props.RolePermissionId, RolePermission);
    } else {
      response = await store.addRolePermission(RolePermission);
    }

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: 'Éxito',
        text: props.RolePermissionId ? 'rolpermiso actualizado con éxito ✅' : 'rolpermiso creado con éxito ✅',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: `❌ Código ${response.status}: ${response.data?.messFACode || 'Ocurrió un error'}`,
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
  router.push('/RolePermissions');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        {{ props.RolePermissionId ? "Editar rolpermiso" : "Crear rolpermiso" }}
      </h2>

      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Id rol:</label>
          <input v-model="RolePermission.role_id" type="number" @input="validateField('role_id')" @blur="validateField('role_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.role_id">{{ errors.role_id }}</span>
        </div>

        <div class="w-full">
          <label class="block text-sm font-medium text-gray-700">Id permiso:</label>
          <input v-model="RolePermission.permission_id" type="number" @input="validateField('permission_id')" @blur="validateField('permission_id')"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          <span class="text-red-500 text-sm" v-if="errors.permission_id">{{ errors.permission_id }}</span>
        </div>

        <div class="col-span-1 md:col-span-2">
          <button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
            {{ isSubmitting ? "Enviando..." : props.RolePermissionId ? "Actualizar" : "Crear" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
