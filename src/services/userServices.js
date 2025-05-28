import axios from "axios";
import axiosInstance from "./axiosInstance";

export const getActivityGoing = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(
      "https://localhost:7254/api/Donor/ActivityIsGoing",
      {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          Status: 1,
        },
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Đăng ký không thành công.";
    throw new Error(message);
  }
};

export const RegisterDonate = async (hospitalId) => {
  try {
    const response = await axiosInstance.post(
      "https://localhost:7254/api/Donor/RegisterDonate",
      {
        hospitalId,
      }
    );
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Đăng ký không thành công";
    throw new Error(message);
  }
};
export const HistoriesDonate = async (currentPage, itemsPerPage) => {
  try {
    const response = await axiosInstance.get(
      "https://localhost:7254/api/Donor/History",
      {
        params: {
          pageNumber: currentPage,
          pageSize: itemsPerPage,
        },
      }
    );
    return response;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Yêu cầu lịch sử không thành công";
    throw new Error(message);
  }
};
export const CancelDonation = async(hospitalId) => {
  try{
    const response = await axiosInstance.post("https://localhost:7254/api/Donor/CancelDonation",{
      hospitalId
    })
    return response.data;
  }
  catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Yêu cầu lịch sử không thành công";
    throw new Error(message);
  }
}