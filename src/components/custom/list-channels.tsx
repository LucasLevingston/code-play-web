"use client";

import { Loader2, Users } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { useUnsubscribe } from "@/hooks/useVideoActions";

import type { Channel } from "@/types/user";

import { Button } from "../ui/button";

interface ListChannelsProps {
	channels: Channel[];
}

export function ListChannels({
	channels,
}: ListChannelsProps) {
	const unsubscribe = useUnsubscribe();

	const handleUnsubscribe = async (id: string) => {
		await unsubscribe.mutateAsync(id);
	};

	return (
		<div
			className="
				grid gap-5
				sm:grid-cols-2
				xl:grid-cols-3
				2xl:grid-cols-4
			"
		>
			{channels.map((channel) => {
				const isLoading =
					unsubscribe.isPending &&
					unsubscribe.variables === channel.id;

				return (
					<div
						key={channel.id}
						className="
							group relative overflow-hidden rounded-3xl
							border border-border bg-card p-6
							transition-all duration-300

							hover:-translate-y-1
							hover:border-primary/30
							hover:bg-primary/[0.03]
							hover:shadow-xl
							hover:shadow-primary/5
						"
					>
						{/* Glow */}
						<div
							className="
								absolute right-0 top-0 h-24 w-24
								rounded-full bg-primary/10 blur-2xl
								opacity-0 transition-opacity duration-300
								group-hover:opacity-100
							"
						/>

						<div className="relative z-10 flex flex-col items-center">
							{/* Avatar */}
							<div className="relative">
								<Image
									src={
										channel.avatarUrl ||
										"/default-avatar.png"
									}
									alt={channel.name}
									width={88}
									height={88}
									className="
										h-22 w-22 rounded-full border-4
										border-background object-cover
										shadow-lg
									"
								/>

								<div
									className="
										absolute bottom-1 right-1 h-4 w-4
										rounded-full border-2 border-background
										bg-green-500
									"
								/>
							</div>

							{/* Infos */}
							<div className="mt-5 text-center">
								<h3
									className="
										line-clamp-1 text-lg font-semibold
										text-foreground
									"
								>
									{channel.name}
								</h3>

								<p className="mt-1 text-sm text-muted-foreground">
									@{channel.username}
								</p>

								<div
									className="
										mt-3 inline-flex items-center gap-2
										rounded-full bg-primary/10
										px-3 py-1 text-xs font-medium
										text-primary
									"
								>
									<Users className="h-3.5 w-3.5" />

									{channel.subscribersCount} inscritos
								</div>
							</div>

							{/* Buttons */}
							<div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
								<Link
									href={`/dashboard/channel/${channel.id}`}
									className="flex-1"
								>
									<Button
										variant="outline"
										className="
											w-full rounded-2xl border-border
											bg-background/60
											backdrop-blur
											transition-all

											hover:border-primary/40
											hover:bg-primary/10
											hover:text-primary
										"
									>
										Visitar
									</Button>
								</Link>

								<Button
									type="button"
									variant="secondary"
									disabled={isLoading}
									className="
										flex-1 rounded-2xl
										bg-red-500/10 text-red-500
										transition-all

										hover:bg-red-500/15
										hover:text-red-400

										disabled:opacity-60
									"
									onClick={() =>
										handleUnsubscribe(channel.id)
									}
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Saindo...
										</>
									) : (
										"Desinscrever"
									)}
								</Button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}