import axios from 'axios';
import type { Session } from '../models/Session';

const API_URL = import.meta.env.VITE_API_URL + "/sessions";

class SessionService {
    async getSessions() {
        const response = await axios.get<Session[]>(API_URL);
        return response;
    }

    async getSession(id: number) {
        const response = await axios.get<Session>(`${API_URL}/${id}`);
        return response;
    }

    async createSession(Session: Session) {
        const response = await axios.post<Session>(API_URL, Session);
        return response;
    }

    async updateSession(id: number, Session: Session) {
        const response = await axios.put<Session>(`${API_URL}/${id}`, Session);
        return response;
    }

    async deleteSession(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new SessionService();