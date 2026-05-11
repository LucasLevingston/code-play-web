"use client";

import clsx from "clsx";

import {
	Eye,
	MessageCircle,
	MoreHorizontal,
	PlayCircle,
	ThumbsUp,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Loading } from "@/components/custom/loading";
import PageHeader from "@/components/custom/page-header";
import { CommentsList } from "@/components/list-comments";
import { Button } from "@/components/ui/button";
import VideoDetailsComponent from "@/components/VideoDetailsComponent";
import { useGetVideoById } from "@/hooks/useGetVideoById";
import { useGetVideos } from "@/hooks/useGetVideos";

function VideoPage() {
	const params = useParams();

	const videoId = params?.Id as string;

	const { data: video } = useGetVideoById(videoId);

	const { data: allVideos = [] } = useGetVideos(
		video?.segment
			? {
					segment: video.segment,
				}
			: {},
	);

	if (!video) {
		return <Loading />;
	}

	const nextUp = allVideos.filter((v) => v.id !== videoId).slice(0, 6);

	const {
		title,
		thumbnailUrl,
		duration,
		tags = [],
		comments = [],
		views,
	} = video;

	return (
		<section className="mx-auto w-full max-w-[1700px] px-3 py-4 sm:px-4 lg:px-6">
			<PageHeader title="Assistir vídeo" description="Aproveite o conteúdo!" />
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
				<div className="min-w-0 space-y-5">
					<div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
						<div className="relative aspect-video w-full">
							<Image
								src={thumbnailUrl}
								alt={`Thumbnail de ${title}`}
								fill
								priority
								className="object-cover"
							/>

							<div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
								<div className="inline-flex items-center rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
									<PlayCircle className="mr-2 h-3.5 w-3.5" />
									Vídeo
								</div>

								<div className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
									{duration}
								</div>
							</div>
						</div>
					</div>

					<div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
						<div className="flex flex-col gap-5">
							<div>
								<h1 className="text-xl font-bold text-foreground sm:text-2xl">
									{title}
								</h1>

								<div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<Eye className="h-4 w-4" />
										{views} visualizações
									</div>

									<div className="flex items-center gap-1">
										<MessageCircle className="h-4 w-4" />
										{comments.length} comentários
									</div>
								</div>
							</div>

							{/* Botões */}
							<div className="flex flex-wrap gap-3">
								<Button
									type="button"
									variant="secondary"
									className="rounded-2xl"
								>
									<ThumbsUp className="mr-2 h-4 w-4" />
									Curtir
								</Button>

								<Button
									type="button"
									variant="secondary"
									className="rounded-2xl"
								>
									Salvar
								</Button>

								<Button type="button" variant="outline" className="rounded-2xl">
									Compartilhar
								</Button>
							</div>
						</div>
					</div>

					<VideoDetailsComponent video={video} />

					<div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
						<div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
							<h3 className="text-lg font-semibold text-foreground">
								{comments.length} comentários
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
							<div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
								<Image
									src={video.user.avatarUrl || "/default-avatar.png"}
									alt="Avatar"
									width={36}
									height={36}
									className="rounded-full"
								/>

								<input
									type="text"
									placeholder="Adicione um comentário..."
									className="
										flex-1 bg-transparent text-sm text-foreground
										outline-none placeholder:text-muted-foreground
									"
								/>
							</div>

							{/* Lista */}
							{comments.length > 0 ? (
								<CommentsList comments={comments} />
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

					{tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
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
		</section>
	);
}

export default VideoPage;
