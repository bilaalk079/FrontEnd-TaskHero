import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,

    login: (user, accessToken) => set({ user, accessToken }),

    setAccessToken: (accessToken) => set({ accessToken }),
    setRefreshToken: (refreshToken) => set({ refreshToken }),

    logout: () => {
      set({ user: null, accessToken: null, refreshToken: null });
      window.location.href = "/login";
    },
  }))
);

export default useAuthStore;
