import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiUserService from "./ApiUserService";

const baseUrl = "https://localhost:7227/api";
const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const response = await axios.get<string>(
          `${baseUrl}/Account/RefreshToken`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              userId: localStorage.getItem("userId"),
            },
          }
        );

        const refreshedToken = response.data;
        localStorage.setItem("accessToken", refreshedToken);

        originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

        return await axios(originalRequest);
      } catch (refreshError) {
        console.error("Axiosinstance");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
