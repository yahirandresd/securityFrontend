import axios from 'axios';
import type { RolePermission } from '../models/RolePermission';

const API_URL = import.meta.env.VITE_API_URL + "/role-permissions";

class RolePermissionService {
    async getRolePermissions() {
        const response = await axios.get<RolePermission[]>(API_URL);
        return response;
    }

    async getRolePermission(id: string) {
        const response = await axios.get<RolePermission>(`${API_URL}/${id}`);
        return response;
    }

    async createRolePermission(RolePermission: RolePermission) {
        const response = await axios.post<RolePermission>(`${API_URL}/role/${RolePermission.role_id}/permission/${RolePermission.permission_id}`, RolePermission);
        return response;
    }

    async updateRolePermission(id: string, RolePermission: RolePermission) {
        const response = await axios.put<RolePermission>(`${API_URL}/${id}`, RolePermission);
        return response;
    }

    async deleteRolePermission(RolePermission: RolePermission) {
        await axios.delete(`${API_URL}/role/${RolePermission.role_id}/permission/${RolePermission.permission_id}`);
    }
}

export default new RolePermissionService();