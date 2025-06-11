import { DigitalSignature } from '@/models/DigitalSignature';
import DigitalSignatureService from '@/service/DigitalSignatureService';
import { defineStore } from 'pinia';

export const useDigitalSignatureStore = defineStore('digitalSignature', {
  state: () => ({
    signatures: [] as DigitalSignature[],
  }),

  actions: {
    // Obtener todas las firmas digitales
    async fetchSignatures() {
      const response = await DigitalSignatureService.getSignatures();
      this.signatures = response.data;
      return response;
    },

    // Obtener una firma digital por ID
    async getSignature(id: number) {
      return await DigitalSignatureService.getSignature(id);
    },

    // Agregar una firma digital (envía solo la foto como objeto)
    async addSignature(userId: number, file: File) {
      const response = await DigitalSignatureService.createSignature(userId, { photo: file });
      if (response.status === 201) {
        this.signatures.push(response.data);
      }
      return response;
    },

    // Editar una firma existente
    async editSignature(id: number, formData: FormData) {
      const response = await DigitalSignatureService.updateSignature(id, formData);
      if (response.status === 200) {
        // Actualiza la firma modificada en el array
        const index = this.signatures.findIndex(sig => sig.id === id);
        if (index !== -1) {
          this.signatures[index] = response.data;
        }
      }
      return response;
    },

    // Eliminar una firma
    async deleteSignature(id: number) {
      await DigitalSignatureService.deleteSignature(id);
      this.signatures = this.signatures.filter(signature => signature.id !== id);
    },

    async fetchSignaturesByUser(userId: number) {
      const response = await DigitalSignatureService.getSignaturesByUser(userId);
      this.signatures = Array.isArray(response.data) ? response.data : [response.data];
      return this.signatures;
    },
  },
});