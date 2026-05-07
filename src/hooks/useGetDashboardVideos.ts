import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { videoType } from "@/types/video";

interface GetDashboardVideosParams {
   limit?: number;
}

async function fetchDashboardVideos(params: GetDashboardVideosParams = {}): Promise<videoType[]> {
   try {
      const { data } = await api.get("/videos", {
         params: {
            limit: params.limit || 20,
         },
      });
      return data;
   } catch {
      throw new Error("Erro ao buscar vídeos do dashboard");
   }
}

export function useGetDashboardVideos(params: GetDashboardVideosParams = {}) {
   return useQuery({
      queryKey: ["dashboard-videos", params],
      queryFn: () => fetchDashboardVideos(params),
   });
}
