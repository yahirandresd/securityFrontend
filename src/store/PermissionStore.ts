import type { Permission } from '@/models/Permission';
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
        async getGroupedPermission(id: number) {
            return await PermissionService.getGroupedPermissions(id);
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