import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Channel } from "@/types/user";

export function useGetChannelById(id: string) {
   return useQuery({
      queryKey: ["channel", id],
      queryFn: async () => {
         const { data } = await api.get<Channel & { isSubscribed: boolean }>(`/users/${id}`);

         return data;
      },
      enabled: !!id,
   });
}
