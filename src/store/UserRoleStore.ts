import type { UserRole } from '@/models/UserRole';
import UserRoleService from '@/service/UserRoleService';
import { defineStore } from 'pinia';

export const useUserRoleStore = defineStore('userRoleStore', {
    state: () => ({
        userRoles: [] as UserRole[],
    }),
    actions: {
        async fetchUserRoles() {
            let response = await UserRoleService.getUserRoles();
            this.userRoles = response.data;
            return this.userRoles;
        },
        async getUserRole(id: string) {
            return await UserRoleService.getUserRole(id);
        },
        async addUserRole(userRole: UserRole) {
            return await UserRoleService.createUserRole(userRole);
        },
        async editUserRole(id: string, userRole: UserRole) {
            return await UserRoleService.updateUserRole(id, userRole);
        },
        async removeUserRole(id: string) {
            return await UserRoleService.deleteUserRole(id);
        },
    }
});
