import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5156/api",
  timeout: 20000,
});

api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      localStorage.removeItem("token");
      window.location.assign("/login");
    }

    return Promise.reject(error);
  }
);

export function getApiErrorMessage(
  error: unknown,
  fallback = "İşlem sırasında beklenmeyen bir hata oluştu."
) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object" && "message" in data) {
      const message = (data as { message?: unknown }).message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }
    }

    if (error.code === "ECONNABORTED") {
      return "Sunucu yanıtı gecikti. Lütfen bağlantınızı kontrol edip tekrar deneyin.";
    }

    if (!error.response) {
      return "Sunucuya ulaşılamıyor. API çalışıyor mu kontrol edin.";
    }
  }

  return fallback;
}
