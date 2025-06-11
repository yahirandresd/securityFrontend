import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/profiles";

class ProfileService {
    async getProfiles() {
        return await axios.get(API_URL);
    }

    async getProfile(id: number) {
        return await axios.get(`${API_URL}/${id}`);
    }

      /**
   * Crear una firma digital para un usuario
   * @param userId ID del usuario
   * @param profile Objeto con la foto (File)
   */
    async createProfile(userId: number, profile: { photo: File }) {
    const formData = new FormData();
    formData.append("photo", profile.photo);

    return await axios.post(`${API_URL}/user/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
   }

      /**
   * Crear una firma digital para un usuario
   * @param userId ID del usuario
   * @param profile Objeto con la foto (File)
   */
    async updateProfile(userId: number, profile: { photo: File }) {
    const formData = new FormData();
    formData.append("photo", profile.photo);

    return await axios.put(`${API_URL}/user/${userId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
   }

    async deleteProfile(id: number) {
        return await axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProfileService();
