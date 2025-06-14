import axios from 'axios';
import type { Session } from '../models/Session';

const API_URL = import.meta.env.VITE_API_URL + "/sessions";

class SessionService {
    async getSessions() {
        const response = await axios.get<Session[]>(API_URL);
        return response;
    }

    async getSession(id: string) {
        const response = await axios.get<Session>(`${API_URL}/${id}`);
        return response;
    }

    async createSession(Session: Session) {
        const response = await axios.post<Session>(`${API_URL}/user/${Session.user_id}`, Session);
        return response;
    }

    async updateSession(id: string, Session: Session) {
        const response = await axios.put<Session>(`${API_URL}/${id}`, Session);
        return response;
    }

    async deleteSession(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    }

    async getSessionsByUser(userId: number) {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    }
}

export default new SessionService();