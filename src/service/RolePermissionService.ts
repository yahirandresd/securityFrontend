import axios from 'axios';
import type { RolePermission } from '../models/RolePermission';

const API_URL = import.meta.env.VITE_API_URL + "/RolePermissions";

class RolePermissionService {
    async getRolePermissions() {
        const response = await axios.get<RolePermission[]>(API_URL);
        return response;
    }

    async getRolePermission(id: number) {
        const response = await axios.get<RolePermission>(`${API_URL}/${id}`);
        return response;
    }

    async createRolePermission(RolePermission: RolePermission) {
        const response = await axios.post<RolePermission>(API_URL, RolePermission);
        return response;
    }

    async updateRolePermission(id: number, RolePermission: RolePermission) {
        const response = await axios.put<RolePermission>(`${API_URL}/${id}`, RolePermission);
        return response;
    }

    async deleteRolePermission(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new RolePermissionService();