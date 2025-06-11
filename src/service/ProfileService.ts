import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/profiles";

class ProfileService {
    async getProfiles() {
        return await axios.get(API_URL);
    }

    async getProfile(id: number) {
        return await axios.get(`${API_URL}/${id}`);
    }

    async addProfile(userId: number, formData: FormData) {
        return await axios.post(`${API_URL}/user/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    async editProfile(profileId: number, formData: FormData) {
        return await axios.put(`${API_URL}/${profileId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async deleteProfile(id: number) {
        return await axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProfileService();
