import type { SecurityQuestion } from '@/models/SecurityQuestion'
import SecurityQuestionService from '@/service/SecurityQuestionService'
import { defineStore } from 'pinia'

export const useSecurityQuestionStore = defineStore('securityQuestionStore', {
  state: () => ({
    questions: [] as SecurityQuestion[],
  }),
  actions: {
    async fetchQuestions() {
      const response = await SecurityQuestionService.getQuestions()
      this.questions = response.data
      return this.questions
    },
    async getQuestion(id: number) {
      return await SecurityQuestionService.getQuestion(id)
    },
    async addQuestion(question: SecurityQuestion) {
      return await SecurityQuestionService.createQuestion(question)
    },
    async editQuestion(id: number, question: SecurityQuestion) {
      return await SecurityQuestionService.updateQuestion(id, question)
    },
    async removeQuestion(id: number) {
      return await SecurityQuestionService.deleteQuestion(id)
    },
  },
})
