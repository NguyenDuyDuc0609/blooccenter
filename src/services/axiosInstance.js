import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: "https://localhost:7254/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");
      const accessToken = Cookies.get("accessToken");

      try {
        const res = await axios.post(
          "https://localhost:7254/api/Auth/refresh",
          {
            accessToken,
            refreshToken,
          }
        );

        const newToken = res.data.token;
        if (!newToken) throw new Error("No new token received");

        Cookies.set("accessToken", newToken);
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        Object.keys(Cookies.get()).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const axiosPublic = axios.create({
  baseURL: "https://localhost:7254/api",
  headers: {
    "Content-Type": "application/json",
  },
});