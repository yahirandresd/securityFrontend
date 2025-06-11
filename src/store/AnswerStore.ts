import type { Answer } from '@/models/Answer';
import AnswerService from '@/service/AnswerService';
import { defineStore } from 'pinia';

export const useAnswerStore = defineStore('answerStore', {
  state: () => ({
    answers: [] as Answer[],
  }),
  actions: {
    async fetchAnswers() {
      const response = await AnswerService.getAnswers();
      this.answers = response.data;
      return this.answers;
    },
    async getAnswer(id: number) {
      const response = await AnswerService.getAnswer(id);
      return response.data;
    },
    async addAnswer(answer: Answer) {
      const response = await AnswerService.createAnswer(answer);
      this.answers.push(response.data);
      return response.data;
    },
    async editAnswer(id: number, answer: Answer) {
      const response = await AnswerService.updateAnswer(id, answer);
      const index = this.answers.findIndex(a => a.id === id);
      if (index !== -1) {
        this.answers[index] = response.data;
      }
      return response.data;
    },
    async removeAnswer(id: number) {
      await AnswerService.deleteAnswer(id);
      this.answers = this.answers.filter(a => a.id !== id);
    },
  }
});
