import axios from "axios"
import type { SecurityQuestion } from "../models/SecurityQuestion"

const API_URL = import.meta.env.VITE_API_URL + "/security-questions"

class SecurityQuestionService {
  async getQuestions() {
    const response = await axios.get<SecurityQuestion[]>(API_URL)
    return response
  }

  async getQuestion(id: number) {
    const response = await axios.get<SecurityQuestion>(`${API_URL}/${id}`)
    return response
  }

  async createQuestion(question: SecurityQuestion) {
    const response = await axios.post<SecurityQuestion>(API_URL, question)
    return response
  }

  async updateQuestion(id: number, question: SecurityQuestion) {
    const response = await axios.put<SecurityQuestion>(`${API_URL}/${id}`, question)
    return response
  }

  async deleteQuestion(id: number) {
    await axios.delete(`${API_URL}/${id}`)
  }
}

export default new SecurityQuestionService()
