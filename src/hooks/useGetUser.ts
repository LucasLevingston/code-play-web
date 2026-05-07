import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { UserType } from "@/types/user";

async function fetchUserData(): Promise<UserType> {
   try {
      const { data } = await api.get("/users/me");
      return data;
   } catch {
      throw new Error("Erro ao buscar dados do usuário");
   }
}

export function useGetUser() {
   return useQuery({
      queryKey: ["user"],
      queryFn: () => fetchUserData(),
   });
}
