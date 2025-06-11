import type { RolePermission } from '@/models/RolePermission';
import RolePermissionService from '@/service/RolePermissionService';
import { defineStore } from 'pinia';

export const useRolePermissionStore = defineStore('RolePermissionStore', {
    state: () => ({
        RolePermissions: [] as RolePermission[],
    }),
    actions: {
        async fetchRolePermissions() {
            let response = await RolePermissionService.getRolePermissions();
            this.RolePermissions = response.data
            return this.RolePermissions
        },
        async getRolePermission(id: string) {
            return await RolePermissionService.getRolePermission(id);
        },
        async addRolePermission(RolePermission: RolePermission) {
            return await RolePermissionService.createRolePermission(RolePermission);
        },
        async editRolePermission(id: string, RolePermission: RolePermission) {
            return await RolePermissionService.updateRolePermission(id, RolePermission);

        },
        async removeRolePermission(RolePermission: RolePermission) {
            return await RolePermissionService.deleteRolePermission(RolePermission);
        },
    }
});