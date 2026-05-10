import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Video } from "@/types/video";

interface GetVideosParams {
	page?: number;
	limit?: number;
	segment?: string;
}

async function fetchVideos(params: GetVideosParams): Promise<Video[]> {
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
