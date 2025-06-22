import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
