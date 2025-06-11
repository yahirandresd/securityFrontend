import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/profiles";

class ProfileService {
    async getProfiles() {
        return await axios.get(API_URL);
    }

    async getProfile(id: number) {
        return await axios.get(`${API_URL}/${id}`);
    }

    async createProfile(formData: FormData) {
        return await axios.post(`${API_URL}/user/${formData.get('user_id')}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async updateProfile(id: number, formData: FormData) {
        return await axios.put(`${API_URL}/${id}`, formData, {
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
