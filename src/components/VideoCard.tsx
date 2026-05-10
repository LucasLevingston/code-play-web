import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { Video } from "@/types/video";

interface VideoCardProps {
	video: Video;
	className?: string;
}

export function VideoCard({
	video: { id, thumbnailUrl, duration, title, user, views },
	className,
}: VideoCardProps) {
	return (
		<Link href={`/dashboard/video/${id}`}>
			<div
				className={clsx(
					"flex flex-col gap-3 cursor-pointer group",
					className,
				)}
			>
				<div className="relative w-full rounded-xl overflow-hidden bg-zinc-800 aspect-video">
					<Image
						src={thumbnailUrl}
						alt={`Thumbnail de ${title}`}
						fill
						className="object-cover transition-transform duration-200 group-hover:scale-105 aspect-video md:aspect-[16/8.5]"
					/>

					<span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
						{duration}
					</span>
				</div>

				<div className="flex flex-col">
					<h3
						className={clsx(
							"text-white font-semibold leading-tight line-clamp-2",
						)}
					>
						{title}
					</h3>

					<div className={clsx("text-zinc-400 mt-1 flex items-center gap-1")}>
						<span>{user.name}</span>
						<span>•</span>
						<span>{views}</span>
					</div>
				</div>
			</div>{" "}
		</Link>
	);
}
