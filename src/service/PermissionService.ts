import axios from 'axios';
import type { Permission } from '../models/Permission';
import type {Role} from '../models/Role'

const API_URL = import.meta.env.VITE_API_URL + "/permissions";

class PermissionService {
    async getPermissions() {
        const response = await axios.get<Permission[]>(API_URL);
        return response;
    }
    async getGroupedPermissions(id:number) {
        const response = await axios.get<Role>(`${API_URL}/${id}`);
        return response;
    }

    async getPermission(id: number) {
        const response = await axios.get<Permission>(`${API_URL}/${id}`);
        return response;
    }

    async createPermission(Permission: Permission) {
        const response = await axios.post<Permission>(API_URL, Permission);
        return response;
    }

    async updatePermission(id: number, Permission: Permission) {
        const response = await axios.put<Permission>(`${API_URL}/${id}`, Permission);
        return response;
    }

    async deletePermission(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new PermissionService();