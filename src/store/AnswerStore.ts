import type { Answer } from '@/models/Answer';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnswerStore = defineStore('answerStore', {
  state: () => ({
    answers: [] as Answer[],
  }),
  actions: {
    async fetchAnswers() {
      const response = await axios.get('/api/answers');
      this.answers = response.data;
      return this.answers;
    },
    async getAnswer(id: number) {
      return await axios.get(`/api/answers/${id}`);
    },
    async addAnswer(answer: { content: string; securityQuestion_id: number; user_id: number }) {
      return await axios.post('/api/answers', answer);
    },
    async editAnswer(id: number, answer: { content: string; securityQuestion_id: number; user_id: number }) {
      return await axios.put(`/api/answers/${id}`, answer);
    },
    async removeAnswer(id: number) {
      return await axios.delete(`/api/answers/${id}`);
    },
  },
});
