import axios from "axios";

const baseUrl = "https://localhost:7227/api";
const accessToken = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
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

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

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

        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
