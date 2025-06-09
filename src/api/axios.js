import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
    baseURL:'https://backend-taskhero-1.onrender.com/api',
    withCredentials:true,
})

api.interceptors.request.use(config => {
    const token = useAuthStore.getState().accessToken
    if (token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.get('/auth/refresh');
        const newAccessToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh token failed. Logging out...");
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);



   export default api