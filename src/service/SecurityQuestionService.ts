import axios from 'axios';
import type { SecurityQuestion } from '../models/SecurityQuestion';

const API_URL = import.meta.env.VITE_API_URL + '/security-question';

class SecurityQuestionService {
  async getAll(): Promise<SecurityQuestion[]> {
    const response = await axios.get<SecurityQuestion[]>(API_URL);
    return response.data;
  }
  
  async getById(id: number): Promise<SecurityQuestion> {
    const response = await axios.get<SecurityQuestion>(`${API_URL}/${id}`);
    return response.data;
  }

  async create(question: Omit<SecurityQuestion, 'id'>): Promise<SecurityQuestion> {
    const response = await axios.post<SecurityQuestion>(API_URL, question);
    return response.data;
  }

  async update(id: number, question: Partial<SecurityQuestion>): Promise<SecurityQuestion> {
    const response = await axios.put<SecurityQuestion>(`${API_URL}/${id}`, question);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default new SecurityQuestionService();
