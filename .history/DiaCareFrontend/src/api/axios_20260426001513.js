import axios from "axios";
import { authStore } from "../store/authStore";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // 401 / 403 handling: clear auth and redirect to login
    const status = err.response?.status;
    if ((status === 401 || status === 403) && !original._retry) {
      original._retry = true;
      authStore.clear();
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }

    return Promise.reject(err);
  },
);

export default api;
