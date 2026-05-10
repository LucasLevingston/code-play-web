"use client";

import { useEffect, useMemo, useState } from "react";

import { Loading } from "@/components/custom/loading";
import { VideoCard } from "@/components/VideoCard";

import { useGetDashboardVideos } from "@/hooks/useGetDashboardVideos";

import { VideoSegment } from "@/types/video";

const Dashboard = () => {
	const [mounted, setMounted] = useState(false);

	const [selectedSegment, setSelectedSegment] = useState<
		VideoSegment | "All"
	>("All");

	const { data: videos = [], isLoading } = useGetDashboardVideos();

	useEffect(() => {
		setMounted(true);
	}, []);

	const filteredVideos = useMemo(() => {
		if (selectedSegment === "All") {
			return videos;
		}

		return videos.filter(
			(video) => video.segment === selectedSegment,
		);
	}, [selectedSegment, videos]);

	if (isLoading) {
		return <Loading />;
	}

	if (!mounted) return null;

	const categories = [
		{ value: "All", label: "Todos" },
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

	return (
		<div className="w-full px-3 py-6 sm:px-4 lg:px-6 xl:px-8">
			{/* Categorias */}
			<div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
				{categories.map((category) => (
					<button
						key={category.value}
						type="button"
						onClick={() =>
							setSelectedSegment(category.value)
						}
						className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
							selectedSegment === category.value
								? "border-primary bg-primary text-primary-foreground"
								: "border-border bg-background text-muted-foreground hover:bg-muted"
						}`}
					>
						{category.label}
					</button>
				))}
			</div>

			{/* Destaques */}
			<section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr] xl:gap-6">
				{/* Vídeo principal */}
				<div className="min-w-0">
					{featured && (
						<VideoCard
							video={featured}
							className="h-full w-full"
						/>
					)}
				</div>

				{/* Vídeos laterais */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
					{[sideFirst, sideSecond]
						.filter(Boolean)
						.map((video) => (
							<VideoCard
								key={video.id}
								video={video}
								className="w-full"
							/>
						))}
				</div>
			</section>

			{/* Grid de vídeos */}
			<section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{visibleGridVideos
					.slice(0, 12)
					.map((video) => (
						<VideoCard
							key={video.id}
							video={video}
							className="w-full"
						/>
					))}
			</section>
		</div>
	);
};

export default Dashboard;