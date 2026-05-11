"use client";

import { History } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "@/components/custom/page-header";
import { VideoList } from "@/components/VideoList";
import { useGetHistoryVideos } from "@/hooks/useGetHistoryVideos";

export default function HistoryPage() {
	const { data: videos = [] } = useGetHistoryVideos();
	const [removedIds, setRemovedIds] = useState<string[]>([]);

	const filteredVideos = useMemo(
		() => videos.filter((v) => !removedIds.includes(v.id)),
		[videos, removedIds],
	);

	const handleRemove = (id: string) => {
		setRemovedIds((prev) => [...prev, id]);
	};

	return (
		<div className="space-y-4">
			<PageHeader
				title="Histórico de Visualização"
				description="Veja os vídeos que você assistiu"
				icon={<History className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>

			<VideoList
				videos={filteredVideos}
				isEmpty={filteredVideos.length === 0}
				emptyMessage="Nenhum vídeo no histórico"
				showRemoveButton
				onRemove={handleRemove}
			/>
		</div>
	);
}
