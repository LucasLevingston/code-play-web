import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { videoType } from "@/types/video";

async function fetchVideoById(videoId: string): Promise<videoType> {
   try {
      const { data } = await api.get(`/videos/${videoId}`);
      return data;
   } catch {
      throw new Error("Erro ao buscar vídeo");
   }
}

export function useGetVideoById(videoId: string) {
   return useQuery({
      queryKey: ["video", videoId],
      queryFn: () => fetchVideoById(videoId),
      enabled: !!videoId,
   });
}
