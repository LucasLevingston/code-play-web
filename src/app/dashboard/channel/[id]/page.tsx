"use client";

import { BellRing, CheckCircle2, PlayCircle, Users } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Loading } from "@/components/custom/loading";
import PageHeader from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/VideoCard";
import { useGetChannelById } from "@/hooks/useGetChannelById";
import { formatNumber } from "@/utils/format-number";

export default function ChannelPage() {
	const params = useParams();
	const channelId = params?.id as string;

	const { data: channel, isLoading } = useGetChannelById(channelId);
	console.log(channel)

	if (isLoading || !channel) {
		return <Loading />;
	}

	return (
		<div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-5 lg:px-8">
			<PageHeader
				title={channel.name}
				description={`@${channel.username}`}
				icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />}
				count={channel.videos?.length || 0}
				countLabel="vídeos"
			/>

			<div
				className="
					relative mt-8 overflow-hidden rounded-3xl
					border border-border bg-card/70
					backdrop-blur
				"
			>
				<div
					className="
						h-40 w-full bg-gradient-to-r
						from-primary/20 via-secondary/10 to-primary/20
						sm:h-52
					"
				/>

				<div className="relative px-5 pb-6 sm:px-8">
					<div
						className="
							flex flex-col gap-5
							lg:flex-row lg:items-end lg:justify-between
						"
					>
						<div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end">
							<div className="relative">
								<Image
									src={channel.avatarUrl || "/default-avatar.png"}
									alt={channel.name}
									width={130}
									height={130}
									className="
										h-28 w-28 rounded-full border-4
										border-background object-cover shadow-xl
										sm:h-32 sm:w-32
									"
								/>

								<div
									className="
										absolute bottom-2 right-2
										flex h-7 w-7 items-center justify-center
										rounded-full bg-primary text-white
									"
								>
									<CheckCircle2 className="h-4 w-4" />
								</div>
							</div>

							<div className="pb-2">
								<div className="flex items-center gap-2">
									<h1
										className="
											text-2xl font-bold text-foreground
											sm:text-3xl
										"
									>
										{channel.name}
									</h1>
								</div>

								<p className="mt-1 text-sm text-muted-foreground">
									@{channel.username}
								</p>

								<div
									className="
										mt-4 flex flex-wrap gap-3
										text-sm text-muted-foreground
									"
								>
									<div className="flex items-center gap-2">
										<Users className="h-4 w-4 text-primary" />
										{formatNumber(channel.subscribersCount || 0)} inscritos
									</div>

									<div className="flex items-center gap-2">
										<PlayCircle className="h-4 w-4 text-primary" />
										{channel.videos?.length || 0} vídeos
									</div>
								</div>
							</div>
						</div>

						<div
							className="
								flex flex-col gap-3 sm:flex-row
							"
						>
							<Button
								className="
									rounded-2xl bg-primary px-6 text-white
									hover:bg-primary/90
								"
							>
								<BellRing className="mr-2 h-4 w-4" />
								Inscrito
							</Button>

							<Button variant="outline" className="rounded-2xl">
								Compartilhar
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-10">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-foreground">
							Vídeos do canal
						</h2>

						<p className="mt-1 text-sm text-muted-foreground">
							Explore os conteúdos publicados por este criador.
						</p>
					</div>
				</div>

				{channel.videos?.length === 0 ? (
					<div
						className="
							flex flex-col items-center justify-center
							rounded-3xl border border-dashed border-primary/20
							bg-gradient-to-br from-primary/5 to-secondary/5
							px-6 py-20 text-center
						"
					>
						<div
							className="
								mb-5 flex h-20 w-20 items-center justify-center
								rounded-full bg-primary/10
							"
						>
							<PlayCircle className="h-10 w-10 text-primary" />
						</div>

						<h2 className="text-xl font-bold text-foreground">
							Nenhum vídeo publicado
						</h2>

						<p className="mt-2 max-w-md text-sm text-muted-foreground">
							Este canal ainda não possui vídeos disponíveis.
						</p>
					</div>
				) : (
					<div
						className="
							grid gap-5
							sm:grid-cols-2
							xl:grid-cols-3
							2xl:grid-cols-4
						"
					>
						{channel.videos?.map((video) => (
							<VideoCard key={video.id} video={video} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
