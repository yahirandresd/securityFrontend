import axios from 'axios';
import { Answer } from '../models/Answer';

const API_URL = import.meta.env.VITE_API_URL + "/answers";

export const AnswerService = {
    async getAll(): Promise<Answer[]> {
        const response = await axios.get<Answer[]>(API_URL);
        return response.data;
    },

    async getById(id: string): Promise<Answer> {
        const response = await axios.get<Answer>(`${API_URL}/${id}`);
        return response.data;
    },

    async create(answer: Answer): Promise<Answer> {
        const response = await axios.post<Answer>(API_URL, answer);
        return response.data;
    },

    async update(id: string, answer: Partial<Answer>): Promise<Answer> {
        const response = await axios.put<Answer>(`${API_URL}/${id}`, answer);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};