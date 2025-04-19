import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/quiz";

const quizService = {
    getAllQuizzes: async (placeId) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-all-quizzes/${placeId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addQuiz: async (placeId, payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/add-quiz/${placeId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateQuiz: async (placeId, quizId, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/update-quiz/${placeId}/${quizId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteQuiz: async (placeId, quizId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-quiz/${placeId}/${quizId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default quizService;
