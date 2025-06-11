import type { Permission } from '@/models/Permission';
import { RolePermission } from '@/models/RolePermission';
import PermissionService from '@/service/PermissionService';
import { defineStore } from 'pinia';

export const usePermissionStore = defineStore('PermissionStore', {
    state: () => ({
        Permissions: [] as Permission[],
    }),
    actions: {
        async fetchPermissions() {
            let response = await PermissionService.getPermissions();
            this.Permissions = response.data
            return this.Permissions
        },
        async getPermission(id: number) {
            return await PermissionService.getPermission(id);
        },
        async getGroupedPermission( rolePermission:RolePermission) {
            return await PermissionService.getGroupedPermissions(rolePermission);
        },
        async addPermission(Permission: Permission) {
            return await PermissionService.createPermission(Permission);
        },
        async editPermission(id: number, Permission: Permission) {
            return await PermissionService.updatePermission(id, Permission);

        },
        async removePermission(id: number) {
            return await PermissionService.deletePermission(id);
        },
    }
});