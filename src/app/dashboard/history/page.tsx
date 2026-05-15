"use client";

import { History } from "lucide-react";
import PageHeader from "@/components/custom/page-header";
import { VideoList } from "@/components/VideoList";
import { useGetVideos } from "@/hooks/useGetVideos";
import { QueryBoundary } from "@/components/custom/query-boundary";

export default function HistoryPage() {
	const { data: videos = [], isLoading, error } = useGetVideos({ segment: 'history', limit: 15 });

	return (
		<QueryBoundary isLoading={isLoading} error={error} >
			<PageHeader
				title="Histórico de Visualização"
				description="Veja os vídeos que você assistiu"
				icon={<History className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>

			<VideoList
				videos={videos}
				isEmpty={videos.length === 0}
				emptyMessage="Nenhum vídeo no histórico"
				showRemoveButton
			/>
		</QueryBoundary>
	);
}
