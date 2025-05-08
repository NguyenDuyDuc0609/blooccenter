import axios from "axios";

const API_URL = "https://localhost:7254/api/Auth/login";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Đăng nhập không thành công."
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw new Error("Không nhận được phản hồi từ server.");
    } else {
      console.error("Error:", error.message);
      throw new Error("Có lỗi trong quá trình gửi yêu cầu.");
    }
  }
};

export const signup = async(UserName, Passsword, Email, FullName) =>{
  try{
    const response = await axios.post("https://localhost:7254/api/Auth/signin",
      {
        UserName, Passsword, Email, FullName
      }
    );
    return response.data;
  }
  catch(error){
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Đăng nhập không thành công."
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw new Error("Không nhận được phản hồi từ server.");
    } else {
      console.error("Error:", error.message);
      throw new Error("Có lỗi trong quá trình gửi yêu cầu.");
    }
  }
}