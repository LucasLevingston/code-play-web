import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { videoType } from "@/types/video";

interface GetHistoryVideosParams {
   limit?: number;
}

async function fetchHistoryVideos(params: GetHistoryVideosParams = {}): Promise<videoType[]> {
   try {
      const { data } = await api.get("/videos/history", {
         params: {
            limit: params.limit || 15,
         },
      });
      return data;
   } catch {
      throw new Error("Erro ao buscar histórico de vídeos");
   }
}

export function useGetHistoryVideos(params: GetHistoryVideosParams = {}) {
   return useQuery({
      queryKey: ["history-videos", params],
      queryFn: () => fetchHistoryVideos(params),
   });
}
