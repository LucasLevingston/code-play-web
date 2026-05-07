import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { videoType } from "@/types/video";

interface GetVideosParams {
   page?: number;
   limit?: number;
   segment?: string;
}

async function fetchVideos(params: GetVideosParams): Promise<videoType[]> {
   try {
      const { data } = await api.get("/videos", { params });
      return data;
   } catch {
      throw new Error("Erro ao buscar vídeos");
   }
}

export function useGetVideos(params: GetVideosParams = {}) {
   return useQuery({
      queryKey: ["videos", params],
      queryFn: () => fetchVideos(params),
   });
}
