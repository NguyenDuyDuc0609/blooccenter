import { axiosPublic } from "../services/axiosInstance";

export const useAxiosPublic = () => {
    const request = async (config) => {
    const response = await axiosPublic(config);
    return response.data;
  };
  return { request };
};
