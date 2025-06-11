import axios from "axios";

// Interfaz de firma digital
export interface DigitalSignature {
  id: number;
  photo: File; // Se almacena como File en el formulario
  user_id: number;
}

// Ruta base del backend
const API_URL = `${import.meta.env.VITE_API_URL}/digital-signatures`;

class DigitalSignatureService {
  /**
   * Obtener todas las firmas digitales
   */
  async getSignatures() {
    return await axios.get<DigitalSignature[]>(API_URL);
  }

  /**
   * Obtener una firma digital por su ID
   * @param id ID de la firma
   */
  async getSignature(id: number) {
    return await axios.get<DigitalSignature>(`${API_URL}/${id}`);
  }

  /**
   * Crear una firma digital para un usuario
   * @param userId ID del usuario
   * @param signature Objeto con la foto (File)
   */
  async createSignature(userId: number, signature: { photo: File }) {
    const formData = new FormData();
    formData.append("photo", signature.photo);

    return await axios.post(`${API_URL}/user/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Actualizar una firma digital
   * @param id ID de la firma
   * @param formData Objeto FormData con la foto
   */
  async updateSignature(id: number, formData: FormData) {
    return await axios.put<DigitalSignature>(`${API_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Eliminar una firma digital por ID
   * @param id ID de la firma
   */
  async deleteSignature(id: number) {
    return await axios.delete(`${API_URL}/${id}`);
  }

  /**
   * Obtener firmas digitales de un usuario por su ID
   * @param userId ID del usuario
   */
  async getSignaturesByUser(userId: number) {
    return await axios.get(`${API_URL}/user/${userId}`);
  }
}

export default new DigitalSignatureService();