// src/store/DeviseStore.ts

import type { Devise } from '@/models/Devise';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useDeviseStore = defineStore('deviseStore', {
  state: () => ({
    devises: [] as Devise[],
  }),
  actions: {
    async fetchDevises() {
      const response = await axios.get('/api/devises');
      this.devises = response.data;
      return this.devises;
    },

    async getDevise(id: number) {
      return await axios.get(`/api/devises/${id}`);
    },

    async addDevise(devise: {
      name: string;
      ip: string;
      operating_system: string;
      user_id: number;
    }) {
      return await axios.post('/api/devises', devise);
    },

    async editDevise(id: number, devise: {
      name: string;
      ip: string;
      operating_system: string;
      user_id: number;
    }) {
      return await axios.put(`/api/devises/${id}`, devise);
    },

    async removeDevise(id: number) {
      return await axios.delete(`/api/devises/${id}`);
    },
  },
});
