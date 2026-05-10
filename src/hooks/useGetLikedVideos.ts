import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Video } from "@/types/video";

interface GetLikedVideosParams {
	limit?: number;
}

async function fetchLikedVideos(
	params: GetLikedVideosParams = {},
): Promise<Video[]> {
	try {
		const { data } = await api.get("/videos/liked", {
			params: {
				limit: params.limit || 12,
			},
		});
		return data;
	} catch {
		throw new Error("Erro ao buscar vídeos curtidos");
	}
}

export function useGetLikedVideos(params: GetLikedVideosParams = {}) {
	return useQuery({
		queryKey: ["liked-videos", params],
		queryFn: () => fetchLikedVideos(params),
	});
}
