import axios from 'axios';
import type { Profile } from '../models/Profile';

const API_URL = import.meta.env.VITE_API_URL + "/profiles";

class ProfileService {
    async getProfiles() {
        const response = await axios.get<Profile[]>(API_URL);
        return response;
    }

    async getProfile(id: number) {
        const response = await axios.get<Profile>(`${API_URL}/${id}`);
        return response;
    }

    async createProfile(profile: Profile) {
        const response = await axios.post<Profile>(`${API_URL}/user/${profile.user_id}`, profile);
        return response;
    }

    async updateProfile(id: number, Profile: Profile) {
        const response = await axios.put<Profile>(`${API_URL}/${id}`, Profile);
        return response;
    }

    async deleteProfile(id: number) {
        await axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProfileService();