import axios from 'axios';
import type { DigitalSignature } from '../models/DigitalSignature';

const API_URL = import.meta.env.VITE_API_URL + '/digital-signature';

class DigitalSignatureService {
  async getAll(): Promise<DigitalSignature[]> {
    const response = await axios.get<DigitalSignature[]>(API_URL);
    return response.data;
  }

  async getById(id: number): Promise<DigitalSignature> {
    const response = await axios.get<DigitalSignature>(`${API_URL}/${id}`);
    return response.data;
  }

  async create(signature: Omit<DigitalSignature, 'id'>): Promise<DigitalSignature> {
    const response = await axios.post<DigitalSignature>(API_URL, signature);
    return response.data;
  }

  async update(id: number, signature: Partial<DigitalSignature>): Promise<DigitalSignature> {
    const response = await axios.put<DigitalSignature>(`${API_URL}/${id}`, signature);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default new DigitalSignatureService();
