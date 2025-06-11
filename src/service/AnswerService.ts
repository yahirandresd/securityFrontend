import axios from "axios";
import type { Answer } from "../models/Answer";

const API_URL = import.meta.env.VITE_API_URL + "/answers";

class AnswerService {
  async getAnswers() {
    const response = await axios.get<Answer[]>(API_URL);
    return response;
  }

  async getAnswer(id: number) {
    const response = await axios.get<Answer>(`${API_URL}/${id}`);
    return response;
  }

  async createAnswer(user_id: number, answer: Answer, security_question_id: number) {
    if (!user_id || !security_question_id) {
      throw new Error("user_id y security_question_id son obligatorios");
    }
    try {
      const response = await axios.post<Answer>(
        `${API_URL}/user/${user_id}/question/${security_question_id}`,
        { content: answer.content }
      );
      return response;
    } catch (error) {
      console.error("Error al crear Answer:", error);
      throw error;
    }
  }

  async updateAnswer(id: number, answer: Answer) {
    const response = await axios.put<Answer>(`${API_URL}/${id}`, answer);
    return response;
  }

  async deleteAnswer(id: number) {
    await axios.delete(`${API_URL}/${id}`);
  }
}

export default new AnswerService();
