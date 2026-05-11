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
			<div
				className="
					flex flex-col items-center justify-center gap-4
					rounded-3xl border border-dashed border-primary/20
					bg-gradient-to-br from-primary/5 to-secondary/5
					px-6 py-14 text-center
				"
			>
				<div
					className="
						flex h-16 w-16 items-center justify-center
						rounded-full bg-primary/10
					"
				>
					<div className="h-6 w-6 rounded-full bg-primary/40" />
				</div>

				<div>
					<p className="text-lg font-semibold text-foreground">
						{emptyMessage}
					</p>

					<p className="mt-1 text-sm text-muted-foreground">
						Que tal adicionar alguns vídeos?
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{videos.map((video) => (
				<Link
					key={video.id}
					href={`/dashboard/video/${video.id}`}
					className="
						group flex flex-col gap-4 overflow-hidden rounded-3xl
						border border-border bg-card p-3
						transition-all duration-300

						hover:border-primary/30
						hover:bg-primary/[0.03]
						hover:shadow-lg
						hover:shadow-primary/5

						sm:flex-row
					"
				>
					{/* Thumbnail */}
					<div
						className="
							relative aspect-video w-full overflow-hidden rounded-2xl
							bg-muted sm:h-28 sm:w-44 sm:min-w-[11rem]
						"
					>
						<Image
							src={video.thumbnailUrl}
							alt={video.title}
							fill
							className="
								object-cover transition-transform duration-500
								group-hover:scale-105
							"
						/>

						<div
							className="
								absolute inset-0 bg-gradient-to-t
								from-black/60 via-transparent to-transparent
							"
						/>

						<span
							className="
								absolute bottom-2 right-2 rounded-lg
								bg-black/80 px-2 py-1 text-[11px]
								font-semibold text-white backdrop-blur
							"
						>
							{video.duration}
						</span>
					</div>

					{/* Conteúdo */}
					<div className="flex flex-1 flex-col justify-between gap-4">
						<div className="space-y-2">
							<h3
								className="
									line-clamp-2 text-base font-semibold
									text-foreground transition-colors
									group-hover:text-primary
								"
							>
								{video.title}
							</h3>

							<p className="text-sm text-muted-foreground">
								{video.user.username}
							</p>
						</div>

						<div
							className="
								flex flex-wrap items-center justify-between gap-3
							"
						>
							<p
								className="
									text-xs text-muted-foreground
								"
							>
								{formatNumber(video.views)} visualizações •{" "}
								{fromNow(video.publishedAt)}
							</p>

							{showRemoveButton && onRemove && (
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="
										rounded-xl opacity-100 transition-all

										sm:opacity-0
										sm:group-hover:opacity-100

										hover:bg-red-500/10
										hover:text-red-500
									"
									onClick={(e) => {
										e.preventDefault();
										onRemove(video.id);
									}}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							)}
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}