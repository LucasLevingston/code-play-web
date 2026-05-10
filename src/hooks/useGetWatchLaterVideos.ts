import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Video } from "@/types/video";

interface GetWatchLaterVideosParams {
	limit?: number;
}

async function fetchWatchLaterVideos(
	params: GetWatchLaterVideosParams = {},
): Promise<Video[]> {
	try {
		const { data } = await api.get("/videos/watch-later", {
			params: {
				limit: params.limit || 8,
			},
		});
		return data;
	} catch {
		throw new Error("Erro ao buscar vídeos para assistir depois");
	}
}

export function useGetWatchLaterVideos(params: GetWatchLaterVideosParams = {}) {
	return useQuery({
		queryKey: ["watch-later-videos", params],
		queryFn: () => fetchWatchLaterVideos(params),
	});
}
