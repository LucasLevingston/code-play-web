"use client";

import { ThumbsUp } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "@/components/custom/page-header";
import { VideoList } from "@/components/VideoList";
import { useGetLikedVideos } from "@/hooks/useGetLikedVideos";

export default function LikedVideosPage() {
	const { data: videos = [] } = useGetLikedVideos();
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
				title="Vídeos Curtidos"
				description="Veja os vídeos que você curtiu"
				icon={<ThumbsUp className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>

			<VideoList
				videos={filteredVideos}
				isEmpty={filteredVideos.length === 0}
				emptyMessage="Nenhum vídeo curtido"
				showRemoveButton
				onRemove={handleRemove}
			/>
		</div>
	);
}
