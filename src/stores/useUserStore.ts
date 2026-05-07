import { create } from 'zustand'

interface User {
   id: string
   name: string
   avatarUrl: string
   channelUrl: string

}

interface UserStore {
   user: User | null
   token: string | null
   isLoading: boolean
   getToken: () => string | null
   loadUser: () => void
   clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
   user: null,
   isLoading: false,
   token: null,
   getToken: () => {
      return "mock-token"
   },
   loadUser: async () => {
      set({ isLoading: true })
      try {
         set({ user: null, isLoading: false })
      } catch {
         set({ isLoading: false })
      }
   },

   clearUser: () => {
      set({ user: null, token: null })
   },
}))
