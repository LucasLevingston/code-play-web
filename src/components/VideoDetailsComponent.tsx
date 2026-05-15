"use client";

import { CornerDownLeft, ThumbsUp } from "lucide-react";
import Image from "next/image";
import type { Video } from "../types/video";
import { fromNow } from "../utils/dayjs";
import { formatNumber } from "../utils/format-number";
import LikeVideoButton from "./custom/button/like-video-button";
import ShareVideoButton from "./custom/button/share-video-button";
import SubscribeButton from "./custom/button/subscribe-button";
import { PageLayout } from "./custom/page-layout";

type videoDetailsProps = {
	video: Video;
};

export function VideoDetailsComponent({
	video: {
		id,
		title,
		views,
		publishedAt,
		user,
		description,
		likesCount,
		isLiked,
		isSubscribed,
	},
}: videoDetailsProps) {
	return (
		<PageLayout>
			<div className="space-y-4">
				<div className="space-y-3">
					<h1 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
						{title}
					</h1>
				</div>
				<div className="justify-between flex">
					<div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/65">
						<span className="font-medium text-white/90">
							{formatNumber(views)} visualizações
						</span>
						<span>•</span>
						<span>{fromNow(publishedAt)}</span>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<LikeVideoButton
							videoId={id}
							isLiked={isLiked}
							className="rounded-2xl"
						>
							<ThumbsUp className="mr-2 h-4 w-4" />
							{likesCount}
						</LikeVideoButton>

						<ShareVideoButton />
					</div>
				</div>
			</div>

			<div className="rounded-[1.5rem] border border-white/5 bg-white/[0.04] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.2)]">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-4">
						<Image
							src={user.avatarUrl || "/default-avatar.png"}
							alt={user.name}
							width={56}
							height={56}
							className="rounded-full ring-2 ring-white/10"
						/>

						<div>
							<h2 className="text-lg font-semibold text-white">{user.name}</h2>
							<p className="text-sm text-white/55">
								{formatNumber(user.subscribersCount || 0)} subscribers
							</p>
						</div>
					</div>

					<SubscribeButton
						channelId={user.id}
						isSubscribed={isSubscribed}
						className="rounded-full"
					/>
				</div>
			</div>

			<div className="rounded-[1.5rem] border border-white/5 bg-white/[0.035] p-4 text-sm leading-6 text-white/70">
				<p>{description}</p>
				<button
					type="button"
					className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-secondary transition hover:text-primary"
				>
					Show more
					<CornerDownLeft className="h-3.5 w-3.5" />
				</button>
			</div>
		</PageLayout>
	);
}

export default VideoDetailsComponent;
