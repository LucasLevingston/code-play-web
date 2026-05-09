import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Video } from "@/types/video";

function getErrorStatus(error: unknown) {
   if (typeof error === "object" && error !== null && "response" in error) {
      const response = (error as { response?: { status?: number } }).response;
      return response?.status;
   }

   return undefined;
}

interface GetDashboardVideosParams {
   limit?: number;
}

async function fetchDashboardVideos(
   params: GetDashboardVideosParams = {},
): Promise<Video[]> {
   try {
      const { data } = await api.get("/videos", {
         params: {
            limit: params.limit || 20,
         },
      });
      return data;
   } catch (error: unknown) {
      if (getErrorStatus(error) === 401) {
         throw new Error("Erro ao buscar vídeos do dashboard");
      }

      return [];
   }
}

export function useGetDashboardVideos(params: GetDashboardVideosParams = {}) {
   return useQuery({
      queryKey: ["dashboard-videos", params],
      queryFn: () => fetchDashboardVideos(params),
   });
}
