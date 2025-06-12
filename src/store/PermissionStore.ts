import type { Permission } from '@/models/Permission';
import PermissionService from '@/service/PermissionService';
import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('PermissionStore', {
    state: () => ({
        Permissions: [] as Permission[],
        groupedPermissions: [] as any[], // Nuevo estado para los permisos agrupados por entidad
    }),

    actions: {
        // Carga todos los permisos (no agrupados)
        async fetchPermissions() {
            const response = await PermissionService.getPermissions();
            this.Permissions = response.data;
            return this.Permissions;
        },

        // Obtener un solo permiso
        async getPermission(id: number) {
            return await PermissionService.getPermission(id);
        },

        // ✅ Obtener permisos agrupados por rol
        async fetchGroupedPermissions(roleId: number) {
            const data = await PermissionService.getGroupedPermissionsByRole(roleId);
            console.log("PERMISOS AGRUPADOS:", data); // 🔍 debería mostrar el array correcto
            this.groupedPermissions = data;
            return data;
        },

    // ✅ Actualizar permiso para un rol específico
        async updateRolePermission(roleId: number, permissionId: number, hasPermission: boolean) {
            try {
                await PermissionService.updatePermission(roleId, permissionId, hasPermission);
                // Opcional: recargar para reflejar cambios
                await this.fetchGroupedPermissions(roleId);
            } catch (error) {
                console.error('Error al actualizar permiso:', error);
                throw error;
            }
        },

        // Crear un nuevo permiso
        async addPermission(permission: Permission) {
            return await PermissionService.createPermission(permission);
        },

        // Editar permiso
        async editPermission(id: number, permission: Permission) {
            return await PermissionService.updatePermission(id, permission);
        },

        // Eliminar permiso
        async removePermission(id: number) {
            return await PermissionService.deletePermission(id);
        }
    }
});
