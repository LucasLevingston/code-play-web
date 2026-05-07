import { create } from "zustand";
import { api } from "@/config/api";

interface AuthState {
   token: string | null;
   isLoading: boolean;
   getToken: () => string | null;
   login: (email: string, password: string) => Promise<void>;
   recover: (email: string) => Promise<void>;
   logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
   token: null,
   isLoading: false,
   getToken: () => get().token,
   login: async (email, password) => {
      set({ isLoading: true });
      try {
         const resp = await api.post("/auth/login", { email, password });
         const token = resp.data?.token ?? null;
         set({ token });
         set({ isLoading: false });
      } catch (err) {
         set({ isLoading: false });
         throw err;
      }
   },
   recover: async (email) => {
      set({ isLoading: true });
      try {
         await api.post("/auth/recover", { email });
         set({ isLoading: false });
      } catch (err) {
         set({ isLoading: false });
         throw err;
      }
   },
   logout: () => set({ token: null }),
}));
