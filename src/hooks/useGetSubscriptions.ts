import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";

interface Channel {
   id: string;
   name: string;
   avatar: string;
   subscribers: number;
   isSubscribed: boolean;
}

async function fetchSubscriptions(): Promise<Channel[]> {
   try {
      const { data } = await api.get("/subscriptions");
      return data;
   } catch {
      throw new Error("Erro ao buscar inscrições");
   }
}

export function useGetSubscriptions() {
   return useQuery({
      queryKey: ["subscriptions"],
      queryFn: () => fetchSubscriptions(),
   });
}
