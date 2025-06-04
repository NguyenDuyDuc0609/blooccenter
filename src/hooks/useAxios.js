import axiosInstance from "../services/axiosInstance";

export const useAxios = () => {
    const request = async (config) => {
        const response = await axiosInstance(config);
        return response.data;
    }
    return { request};
}