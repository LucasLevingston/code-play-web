"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "@/components/custom/loading";
import { LandingPage } from "@/components/LandingPage";
import { VideoCard } from "@/components/VideoCard";
import { useGetDashboardVideos } from "@/hooks/useGetDashboardVideos";
import { useAuthStore } from "@/stores/useAuthStore";
import { VideoSegment } from "@/types/video";
import { fromNow } from "@/utils/dayjs";
import { formatNumber } from "@/utils/format-number";

const Dashboard = () => {
	const token = useAuthStore((state) => state.token);
	const [mounted, setMounted] = useState(false);
	const [selectedSegment, setSelectedSegment] = useState<VideoSegment | "All">(
		"All",
	);
	const { data: videos = [], isLoading } = useGetDashboardVideos();

	useEffect(() => {
		setMounted(true);
	}, []);
	
	const filteredVideos = useMemo(() => {
		if (selectedSegment === "All") {
			return videos;
		}
		
		return videos.filter((video) => video.segment === selectedSegment);
	}, [selectedSegment, videos]);
	if (isLoading) {
		return <Loading />;
	}
	if (!mounted) return null;
	if (!token) return <LandingPage />;

	const categories = [
		{ value: "All", label: "All" },
		{ value: VideoSegment.BACKEND, label: "Backend" },
		{ value: VideoSegment.FRONTEND, label: "Frontend" },
		{ value: VideoSegment.FULLSTACK, label: "Fullstack" },
		{
			value: VideoSegment.ARTIFICIAL_INTELLIGENCE,
			label: "Inteligência Artificial",
		},
		{ value: VideoSegment.DATA_SCIENCE, label: "Data Science" },
		{ value: VideoSegment.DEVOPS, label: "DevOps" },
	] as const;

	const [featured, sideFirst, sideSecond, ...gridVideos] =
		filteredVideos.length >= 3 ? filteredVideos : videos;
	const visibleGridVideos =
		gridVideos.length > 0 ? gridVideos : videos.slice(3);
console.log({ videos, filteredVideos, featured, sideFirst, sideSecond, gridVideos });
	return (
		<div className="px-3 py-8 lg:px-5">
			<div className="mb-6 flex gap-2 overflow-x-auto pb-2">
				{categories?.map((category) => (
					<button
						key={category.value}
						type="button"
						onClick={() => setSelectedSegment(category.value)}
						className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition ${
							selectedSegment === category.value
								? "bg-[#8f7cff] text-black"
								: "bg-white/5 text-white/80 hover:bg-white/10"
						}`}
					>
						{category.label}
					</button>
				))}
			</div>

			<section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
				<article className="group cursor-pointer">
					<div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-900">
						<Image
							src={featured.thumbnailUrl}
							alt={`Thumbnail de ${featured.title}`}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
							priority
						/>
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
						<span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-0.5 text-xs font-semibold text-white">
							{featured.duration}
						</span>
					</div>

					<div className="mt-3 flex gap-3">
						{/* {featured.user.avatarUrl &&
						<Image
						src={featured.user.avatarUrl || "/default-avatar.png"}
						alt={featured.user.name}
						width={36}
						height={36}
						className="h-9 w-9 rounded-full"
						/>
					} */}

						<div>
							<h2 className="line-clamp-2 text-3xl font-extrabold tracking-tight text-white">
								{featured.title}
							</h2>
							<p className="mt-1 text-sm text-zinc-300">{featured.user.name}</p>
							<p className="mt-0.5 text-sm text-zinc-500">
								{formatNumber(featured.views)} views •{" "}
								{fromNow(featured.publishedAt)}
							</p>
						</div>
					</div>
				</article>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
					{[sideFirst, sideSecond].map((video) => (
						<article key={video.id} className="group cursor-pointer">
							<div className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-900">
								<Image
									src={video.thumbnailUrl}
									alt={`Thumbnail de ${video.title}`}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
								/>
								<span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-[11px] font-semibold text-white">
									{video.duration}
								</span>
							</div>

							<h3 className="mt-2 line-clamp-2 text-2xl font-bold text-white">
								{video.title}
							</h3>
							<p className="mt-1 text-sm text-zinc-400">
								{video.user.username} • {formatNumber(video.views)} views
							</p>
						</article>
					))}
				</div>
			</section>

			<section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{visibleGridVideos?.slice(0, 8).map((video) => (
					<VideoCard key={video.id} video={video} />
				))}
			</section>
		</div>
	);
};

export default Dashboard;
