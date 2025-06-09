import axios from 'axios';
import type { Devise } from '../models/Devise';

const API_URL = import.meta.env.VITE_API_URL + "/devise";

class DeviseService {
    async getAll(): Promise<Devise[]> {
        const response = await axios.get<Devise[]>(API_URL);
        return response.data;
    }

    async getById(id: number): Promise<Devise> {
        const response = await axios.get<Devise>(`${API_URL}/${id}`);
        return response.data;
    }

    async create(devise: Omit<Devise, 'id'>): Promise<Devise> {
        const response = await axios.post<Devise>(API_URL, devise);
        return response.data;
    }

    async update(id: number, devise: Partial<Devise>): Promise<Devise> {
        const response = await axios.put<Devise>(`${API_URL}/${id}`, devise);
        return response.data;
    }

    async delete(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new DeviseService();