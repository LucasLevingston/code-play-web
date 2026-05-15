import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Video } from "@/types/video";

interface GetNextUpParams {
   videoId: string;
   limit?: number;
}

async function fetchNextUp(params: GetNextUpParams): Promise<Video[]> {
   try {
      const { data } = await api.get("/videos", { params: { segment: "next-up", videoId: params.videoId, limit: params.limit || 6 } });
      return data;
   } catch (err) {
      return [];
   }
}

export function useGetNextUpVideos(videoId?: string, limit = 6) {
   return useQuery({
      queryKey: ["next-up", videoId, limit],
      queryFn: () => fetchNextUp({ videoId: videoId as string, limit }),
      enabled: !!videoId,
   });
}
