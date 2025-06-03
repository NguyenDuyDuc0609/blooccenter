import axiosInstance from "../services/axiosInstance";

export const useAxios = () => {
    console.log("useAxios called");
    const request = async (config) => {
        const response = await axiosInstance(config);
        return response.data;
    }
    return { request};
}