"use client";

import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "@/components/custom/page-header";
import { VideoList } from "@/components/VideoList";
import { useGetWatchLaterVideos } from "@/hooks/useGetWatchLaterVideos";

export default function WatchLaterPage() {
	const [removedIds, setRemovedIds] = useState<string[]>([]);
	const { data: videos = [] } = useGetWatchLaterVideos();

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
				title="Assitir mais tarde"
				description="Veja os vídeos que você salvou para assistir depois"
				icon={<Clock className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>

			<VideoList
				videos={filteredVideos}
				isEmpty={filteredVideos.length === 0}
				emptyMessage="Nenhum vídeo salvo"
				showRemoveButton
				onRemove={handleRemove}
			/>
		</div>
	);
}
