import type { SecurityQuestion } from '@/models/SecurityQuestion'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useSecurityQuestionStore = defineStore('securityQuestionStore', {
  state: () => ({
    securityQuestions: [] as SecurityQuestion[],
  }),
  actions: {
    async fetchSecurityQuestions() {
      const response = await axios.get('/api/security-questions')
      this.securityQuestions = response.data
      return this.securityQuestions
    },

    async getSecurityQuestion(id: number) {
      return await axios.get(`/api/security-questions/${id}`)
    },

    async addSecurityQuestion(question: { name: string; description: string }) {
      return await axios.post('/api/security-questions', question)
    },

    async editSecurityQuestion(id: number, question: { name: string; description: string }) {
      return await axios.put(`/api/security-questions/${id}`, question)
    },

    async removeSecurityQuestion(id: number) {
      return await axios.delete(`/api/security-questions/${id}`)
    },
  },
})
