"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Video } from "@/types/video";
import { fromNow } from "@/utils/dayjs";
import { formatNumber } from "@/utils/format-number";

interface VideoListProps {
	videos: Video[];
	isEmpty?: boolean;
	emptyMessage?: string;
	onRemove?: (id: string) => void;
	showRemoveButton?: boolean;
}

export function VideoList({
	videos,
	isEmpty = false,
	emptyMessage = "Nenhum vídeo encontrado",
	onRemove,
	showRemoveButton = false,
}: VideoListProps) {
	if (isEmpty || videos.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-white/10 py-12">
				<div className="text-center">
					<p className="text-lg font-semibold text-white">{emptyMessage}</p>
					<p className="mt-1 text-sm text-zinc-400">
						Que tal adicionar alguns vídeos?
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{videos.map((video) => (
				<Link
					key={video.id}
					href={`/dashboard/video/${video.id}`}
					className="group flex gap-4 rounded-lg border border-white/5 p-4 transition hover:bg-white/5"
				>
					<div className="relative h-24 w-40 overflow-hidden rounded">
						<Image
							src={video.thumbnailUrl}
							alt={video.title}
							fill
							className="object-cover transition group-hover:scale-105"
						/>
						<span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
							{video.duration}
						</span>
					</div>

					<div className="flex flex-1 flex-col justify-between">
						<div>
							<h3 className="line-clamp-2 font-semibold text-white group-hover:text-primary">
								{video.title}
							</h3>
							<p className="mt-1 text-sm text-zinc-400">
								{video.user.username}
							</p>
						</div>

						<div className="flex items-center justify-between">
							<p className="text-xs text-zinc-500">
								{formatNumber(video.views)} views • {fromNow(video.publishedAt)}
							</p>

							{showRemoveButton && onRemove && (
								<Button
									variant="ghost"
									size="icon"
									className="opacity-0 transition group-hover:opacity-100"
									onClick={(e) => {
										e.preventDefault();
										onRemove(video.id);
									}}
								>
									<Trash2 className="h-4 w-4 text-red-500" />
								</Button>
							)}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}
