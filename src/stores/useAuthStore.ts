import Cookies from "js-cookie";
import { create } from "zustand";
import { api } from "@/config/api";
import { useUserStore } from "./useUserStore";

function getStoredToken() {
   if (typeof window === "undefined") {
      return null;
   }

   return localStorage.getItem("authToken");
}

function setStoredToken(token: string | null) {
   if (typeof window === "undefined") {
      return;
   }

   if (token) {
      localStorage.setItem("authToken", token);

      Cookies.set("token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return;
   }

   localStorage.removeItem("authToken");

   Cookies.remove("token");

   delete api.defaults.headers.common["Authorization"];
}

interface AuthState {
   token: string | null;
   isLoading: boolean;
   getToken: () => string | null;
   login: (email: string, password: string) => Promise<void>;
   register: (
      name: string,
      email: string,
      password: string,
      age: number,
   ) => Promise<void>;
   recover: (email: string) => Promise<void>;
   logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
   token: getStoredToken(),
   isLoading: false,

   getToken: () => get().token,

   login: async (email, password) => {
      set({ isLoading: true });

      try {
         const resp = await api.post("/auth/login", {
            email,
            password,
         });

         const token = resp.data?.token ?? null;

         set({ token });

         setStoredToken(token);

         set({ isLoading: false });
      } catch (err) {
         set({ isLoading: false });

         throw err;
      }
   },

   register: async (name, email, password, age) => {
      set({ isLoading: true });

      try {
         const resp = await api.post("/auth/register", {
            name,
            email,
            password,
            age,
         });

         const token = resp.data?.token ?? null;

         set({ token });

         setStoredToken(token);

         set({ isLoading: false });
      } catch (err) {
         set({ isLoading: false });

         throw err;
      }
   },

   recover: async () => {
      return Promise.resolve();
   },

   logout: () => {
      const { clearUser } = useUserStore.getState();

      set({ token: null });

      clearUser();

      setStoredToken(null);
   },
}));
