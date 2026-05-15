"use client";

import clsx from "clsx";
import { Eye, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CommentInput } from "@/components/custom/comment-input";
import { QueryBoundary } from "@/components/custom/query-boundary";
import { CommentsList } from "@/components/list-comments";
import { Button } from "@/components/ui/button";
import VideoDetailsComponent from "@/components/VideoDetailsComponent";
import VideoPlayer from "@/components/VideoPlayer";
import { useGetNextUpVideos } from "@/hooks/useGetNextUpVideos";
import { useGetVideoById } from "@/hooks/useGetVideoById";

function VideoPage() {
	const params = useParams();

	const videoId = params?.Id as string;

	const { data: video, isLoading, error } = useGetVideoById(videoId);
	const { data: nextUp = [] } = useGetNextUpVideos(videoId);

	return (
		<QueryBoundary isLoading={isLoading} error={error}>
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
				<div className="min-w-0 space-y-5">
					<VideoPlayer
						src={video?.videoUrl}
						poster={video?.thumbnailUrl}
						title={video?.title || "Vídeo"}
					/>
					{video && <VideoDetailsComponent video={video} />}

					<div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
						<div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
							<h3 className="text-lg font-semibold text-foreground">
								{video?.comments.length} comentários
							</h3>

							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="rounded-xl"
							>
								<MoreHorizontal className="mr-2 h-4 w-4" />
								Ordenar
							</Button>
						</div>

						<div className="mt-5 space-y-5">
							<CommentInput
								videoId={videoId}
								userAvatar={video?.user.avatarUrl}
							/>

							{video?.comments?.length && video?.comments?.length > 0 ? (
								<CommentsList comments={video?.comments} videoId={videoId} />
							) : (
								<div className="rounded-2xl border border-dashed border-border py-10 text-center">
									<p className="text-sm text-muted-foreground">
										Nenhum comentário ainda.
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				<aside className="space-y-5 xl:sticky xl:top-5 xl:h-fit">
					<div className="rounded-3xl border border-border bg-card p-4">
						<div className="mb-5 flex items-center justify-between gap-3">
							<h3 className="text-lg font-semibold text-foreground">
								Próximos vídeos
							</h3>

							<Button
								type="button"
								variant="outline"
								size="sm"
								className="rounded-full"
							>
								Autoplay
							</Button>
						</div>

						<div className="space-y-3">
							{nextUp.map((video) => (
								<Link
									key={video.id}
									href={`/dashboard/video/${video.id}`}
									className="
										group flex gap-3 rounded-2xl border border-transparent
										p-2 transition-all hover:border-border hover:bg-muted/40
									"
								>
									<div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-muted">
										<Image
											src={video.thumbnailUrl}
											alt={video.title}
											fill
											className="
												object-cover transition-transform duration-300
												group-hover:scale-105
											"
										/>

										<span
											className="
												absolute bottom-1.5 right-1.5 rounded
												bg-black/80 px-1.5 py-0.5 text-[10px]
												font-semibold text-white
											"
										>
											{video.duration}
										</span>
									</div>

									<div className="min-w-0 flex-1 py-1">
										<h4 className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
											{video.title}
										</h4>

										<p className="mt-1 text-xs text-muted-foreground">
											{video.user.username}
										</p>

										<p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
											<Eye className="h-3.5 w-3.5" />
											{video.views}
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>

					{video?.tags.length && video?.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{video.tags.map((tag) => (
								<button
									key={tag}
									type="button"
									className={clsx(
										"rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
										"border-border bg-background text-muted-foreground",
										"hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
									)}
								>
									#{tag}
								</button>
							))}
						</div>
					)}
				</aside>
			</div>
		</QueryBoundary>
	);
}

export default VideoPage;
