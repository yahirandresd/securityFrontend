import { defineStore } from "pinia";
import axios from "axios";

export const useDigitalSignatureStore = defineStore("digitalSignature", {
  actions: {
    async getDigitalSignature(id: number) {
      return await axios.get(`/api/digital-signatures/${id}`);
    },
    async addDigitalSignature(signature: { photo: string; user_id: number }) {
      return await axios.post("/api/digital-signatures", signature);
    },
    async editDigitalSignature(id: number, signature: { photo: string; user_id: number }) {
      return await axios.put(`/api/digital-signatures/${id}`, signature);
    },
    async deleteDigitalSignature(id: number) {
      return await axios.delete(`/api/digital-signatures/${id}`);
    },
    async listDigitalSignatures() {
      return await axios.get("/api/digital-signatures");
    },
  },
});
