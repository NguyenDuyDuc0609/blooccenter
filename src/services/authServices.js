import axios from "axios";

const API_URL = "https://localhost:7254/api/Auth/login";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Đăng nhập không thành công.";
    throw new Error(message);
  }
};

export const signup = async (UserName, Password, Email, FullName) => {
  try {
    const response = await axios.post(
      "https://localhost:7254/api/Auth/signin",
      {
        UserName,
        Password,
        Email,
        FullName,
        Role: 3,
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
