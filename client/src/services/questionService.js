import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/question";

const questionService = {
    getAllQuestions: async (quizId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-all-questions/${quizId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addQuestion: async (quizId, payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/add-question/${quizId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateQuestion: async (quizId, questionId, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/update-question/${quizId}/${questionId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteQuestion: async (quizId, questionId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-question/${quizId}/${questionId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default questionService;