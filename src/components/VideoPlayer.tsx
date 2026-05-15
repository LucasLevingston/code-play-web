"use client";

import Image from "next/image";

interface VideoPlayerProps {
	src?: string | null;
	poster?: string | null;
	title: string;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
	return (
		<div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
			<div className="relative aspect-video w-full bg-black">
				{src ? (
					<video
						className="h-full w-full object-contain"
						controls
						playsInline
						preload="metadata"
						poster={poster || undefined}
					>
						<source src={src} />
						<track
							kind="captions"
							label="Português"
							srcLang="pt"
							src="data:text/vtt,WEBVTT%0A%0A00:00.000%20--%3E%2000:00.001%0A"
						/>
						Your browser does not support the video tag.
					</video>
				) : poster ? (
					<Image
						src={poster}
						alt={title}
						fill
						priority
						className="object-cover"
					/>
				) : (
					<div className="flex h-full items-center justify-center text-sm text-white/70">
						Nenhum vídeo disponível.
					</div>
				)}

				{poster ? (
					<div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
						<span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
							Vídeo
						</span>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default VideoPlayer;