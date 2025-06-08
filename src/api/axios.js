import axios from "axios";
import useAuthStore from "../store/authStore";

const api = axios.create({
    baseURL:'http://localhost:5000/api',
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

    if ((err.response?.status === 401 || err.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.get('/auth/refresh');

        const newAccessToken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Update the failed request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshErr) {
        // If refresh also fails, force logout
        useAuthStore.getState().logout();
        return Promise.reject(refreshErr); // Let app logic handle if needed
      }
    }

    // Not a token-related error
    return Promise.reject(err);
  }
);


   export default api