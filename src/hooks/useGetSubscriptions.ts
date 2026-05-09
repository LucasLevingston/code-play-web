import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";

interface Channel {
   id: string;
   name: string;
   avatar: string;
   subscribers: number;
}

interface ApiChannel {
   id: string;
   name: string;
   avatarUrl?: string;
   subscribers: number;
}

async function fetchSubscriptions(): Promise<Channel[]> {
   try {
      const { data } = await api.get("/subscriptions");
      return (data as ApiChannel[]).map((channel) => ({
         id: channel.id,
         name: channel.name,
         avatar: channel.avatarUrl ?? "",
         subscribers: channel.subscribers,
      }));
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
