"use client";

import { Home } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/custom/page-header";
import { VideoCard } from "@/components/VideoCard";
import { useGetVideos } from "@/hooks/useGetVideos";
import { categoriesType, VideoSegment } from "@/types/video";
import { QueryBoundary } from "@/components/custom/query-boundary";

const Dashboard = () => {
	const [selectedSegment, setSelectedSegment] = useState<VideoSegment | "All">(
		"All",
	);

	const { data: videos = [], isLoading, error } = useGetVideos({ limit: 20, segment: selectedSegment === "All" ? undefined : (selectedSegment as string) });

	return (
		<QueryBoundary isLoading={isLoading} error={error} >
			<PageHeader
				title="Bem-vindo ao CodePlay"
				description="A plataforma de vídeos para desenvolvedores"
				icon={<Home className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>{" "}
			<div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
				{categoriesType.map((category) => (
					<button
						key={category.value}
						type="button"
						onClick={() => setSelectedSegment(category.value)}
						className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm ${selectedSegment === category.value
							? "border-primary bg-primary text-primary-foreground"
							: "border-border bg-background text-muted-foreground hover:bg-muted"
							}`}
					>
						{category.label}
					</button>
				))}
			</div>
			<section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr] xl:gap-6">
				<div className="min-w-0">
					{videos[0] && <VideoCard video={videos[0]} className="h-full w-full" />}
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
					{[videos[1], videos[2]].filter(Boolean).map((video) => (
						<VideoCard key={video.id} video={video} className="w-full" />
					))}
				</div>
			</section>
			<section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{videos.slice(1, 12).map((video) => (
					<VideoCard key={video.id} video={video} className="w-full" />
				))}
			</section>
		</QueryBoundary>
	);
};

export default Dashboard;
