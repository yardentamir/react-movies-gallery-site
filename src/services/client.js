import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const apiToken = import.meta.env.VITE_REACT_APP_API_AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${apiToken}`,
  },
});

export default axiosInstance;
