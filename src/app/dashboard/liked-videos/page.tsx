"use client";

import { ThumbsUp } from "lucide-react";
import PageHeader from "@/components/custom/page-header";
import { VideoList } from "@/components/VideoList";
import { useGetVideos } from "@/hooks/useGetVideos";
import { QueryBoundary } from "@/components/custom/query-boundary";

export default function LikedVideosPage() {
	const { data: videos = [], isLoading, error } = useGetVideos({ segment: 'liked', limit: 12 });




	return (
		<QueryBoundary isLoading={isLoading} error={error} >
			<PageHeader
				title="Vídeos Curtidos"
				description="Veja os vídeos que você curtiu"
				icon={<ThumbsUp className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>

			<VideoList
				videos={videos}
				isEmpty={videos.length === 0}
				emptyMessage="Nenhum vídeo curtido"
				showRemoveButton
			/>
		</QueryBoundary>
	);
}
