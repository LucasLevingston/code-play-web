import clsx from "clsx";

import { Eye, MoreHorizontal, PlayCircle } from "lucide-react";
import Image from "next/image";
import { CommentsList } from "@/components/list-comments";
import VideoDetailsComponent from "@/components/VideoDetailsComponent";
import { getVideoMock } from "@/utils/mocks/get-video-mock";

function VideoPage() {
	const video = getVideoMock();
	const {
		title,
		thumbnailUrl,
		duration,
		channelAvatarUrl,
		commentsCount,
		tags = ["Design", "Tech", "Motion", "Cinematography"],
		nextUp,
		comments,
	} = video;
	return (
		<section className="mx-auto w-full max-w-[1440px] px-4 py-4 text-white lg:px-6">
			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
				<div className="min-w-0 space-y-5">
					<div className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
						<div className="relative aspect-video w-full">
							<Image
								src={thumbnailUrl}
								alt={`Thumbnail de ${title}`}
								fill
								className="object-cover"
								priority
							/>

							<div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
								<span className="inline-flex items-center rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
									<PlayCircle className="mr-2 h-3.5 w-3.5" />
									Featured video
								</span>

								<span className="rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
									{duration}
								</span>
							</div>
						</div>
					</div>

					<VideoDetailsComponent video={video} />


					<div className="rounded-[1.5rem] border border-white/5 bg-white/[0.035] p-4 sm:p-5">
						<div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
							<h3 className="text-lg font-semibold text-white">
								{commentsCount} Comments
							</h3>

							<button
								className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
								type="button"
							>
								<MoreHorizontal className="h-4 w-4" />
								Sort by
							</button>
						</div>

						<div className="mt-4 space-y-4">
							<div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/20 px-4 py-3 text-sm text-white/40">
								<Image
									src={channelAvatarUrl}
									alt="Seu avatar"
									width={32}
									height={32}
									className="rounded-full"
								/>
								Add a public comment...
							</div>	{comments ? <CommentsList comments={comments} />:<p className="text-center text-sm text-white/50">
								No comments yet. Be the first to comment!
							</p>
			}
						</div>
					</div>
				</div>

				<aside className="space-y-5 xl:sticky xl:top-4 xl:h-fit">
					<div className="rounded-[1.5rem] border border-white/5 bg-white/[0.035] p-4">
						<div className="mb-4 flex items-center justify-between gap-3">
							<h3 className="text-lg font-semibold text-white">Next up</h3>
							<div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
								Autoplay
								<span className="relative h-5 w-9 rounded-full bg-primary/80">
									<span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow" />
								</span>
							</div>
						</div>

						<div className="space-y-3">
							{nextUp?.map((video) => (
								<article
									key={video.id}
									className="group flex gap-3 rounded-2xl p-1 transition hover:bg-white/[0.04]"
								>
									<div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl bg-black/30">
										<Image
											src={video.thumbnailUrl}
											alt={video.title}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-105"
										/>
										<span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
											{video.duration}
										</span>
									</div>

									<div className="min-w-0 flex-1 py-1">
										<h4 className="line-clamp-2 text-sm font-medium leading-5 text-white">
											{video.title}
										</h4>
										<p className="mt-1 text-xs text-white/45">
											{video.channelName}
										</p>
										<p className="mt-1 flex items-center gap-1 text-xs text-white/45">
											<Eye className="h-3.5 w-3.5" />
											{video.views}
										</p>
									</div>
								</article>
							))}
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className={clsx(
									"rounded-full border px-3 py-1 text-xs font-medium transition",
									tag === "Design"
										? "border-primary/50 bg-primary/20 text-[#f6d7dc]"
										: "border-white/8 bg-white/[0.04] text-white/55",
								)}
							>
								{tag}
							</span>
						))}
					</div>
				</aside>
			</div>
		</section>
	);
}
export default VideoPage;
