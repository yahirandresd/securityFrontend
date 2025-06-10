import axios from "axios";
import type { UserRole } from "../models/UserRole";
const API_URL = import.meta.env.VITE_API_URL + "/user-roles";

class UserRoleService {
    async getUserRoles() {
        const response = await axios.get<UserRole[]>(API_URL);
        return response;
    }

    async getUserRole(id: string) {
        const response = await axios.get<UserRole>(`${API_URL}/${id}`);
        return response;
    }

    async createUserRole(userRole: UserRole) {
        const response = await axios.post<UserRole>(API_URL, userRole);
        return response;
    }

    async updateUserRole(id: string, userRole: UserRole) {
        const response = await axios.put<UserRole>(`${API_URL}/${id}`, userRole);
        return response;
    }

    async deleteUserRole(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserRoleService();
