// src/stores/uiStore.ts
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    loading: false,
  }),
  actions: {
    showLoader() {
      this.loading = true;
    },
    hideLoader() {
      this.loading = false;
    },
  },
});
