import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("https://localhost:7254/api/Auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Đăng nhập không thành công.";
    throw new Error(message);
  }
};
export const signupConfig = (UserName, Password, Email, FullName) => ({
  url: "/Auth/signin",
  method: "post",
  data: {
    UserName,
    Password,
    Email,
    FullName,
    Role: 3,
  }
});

export const forgotPasswordConfig = (email) => ({
  url: "/Auth/Forgotpassword",
  method: "post",
  data: JSON.stringify(email),
  headers: {
    "Content-Type": "application/json"
  }
});
