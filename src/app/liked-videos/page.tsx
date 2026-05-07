"use client";

import { useMemo, useState } from "react";
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
		<div className="px-3 py-8 lg:px-5">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white">Vídeos Curtidos</h1>
				<p className="mt-2 text-sm text-zinc-400">
					{filteredVideos.length} vídeo{filteredVideos.length !== 1 ? "s" : ""}
				</p>
			</div>

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
