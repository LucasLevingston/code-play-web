"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetSubscriptions } from "@/hooks/useGetSubscriptions";
import { useUnsubscribe } from "@/hooks/useVideoActions";

interface Channel {
	id: string;
	name: string;
	avatar: string;
	subscribers: number;
}

export default function SubscriptionsPage() {
	const { data: apiChannels = [] } = useGetSubscriptions();
	console.log(apiChannels)
	const unsubscribe = useUnsubscribe();
	const [channels, setChannels] = useState<Channel[]>([]);

	useEffect(() => {
		setChannels(apiChannels);
	}, [apiChannels]);

	const handleUnsubscribe = async (id: string) => {
		await unsubscribe.mutateAsync(id);
		setChannels((prev) => prev.filter((channel) => channel.id !== id));
	};

	return (
		<div className="px-3 py-8 lg:px-5">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white">Inscrições</h1>
				<p className="mt-2 text-sm text-zinc-400">
					{channels.length} canal{channels.length !== 1 ? "es" : ""}
				</p>
			</div>

			{channels.length === 0 ? (
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-white/10 py-12">
					<div className="text-center">
						<p className="text-lg font-semibold text-white">
							Nenhum canal inscrito
						</p>
						<p className="mt-1 text-sm text-zinc-400">
							Inscreva-se em canais para ver seus vídeos aqui
						</p>
					</div>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{channels.map((channel) => (
						<div
							key={channel.id}
							className="flex flex-col items-center gap-4 rounded-lg border border-white/5 p-6 transition hover:bg-white/5"
						>
							<Image
								src={channel.avatar}
								alt={channel.name}
								width={64}
								height={64}
								className="rounded-full"
							/>

							<div className="text-center">
								<h3 className="font-semibold text-white">{channel.name}</h3>
								<p className="mt-1 text-xs text-zinc-400">
									{(channel.subscribers / 1000).toFixed(0)}K inscritos
								</p>
							</div>

							<div className="flex w-full gap-2">
								<Link href={`/channel/${channel.id}`} className="flex-1">
									<Button
										variant="outline"
										className="w-full border-white/10 text-white hover:bg-white/5"
									>
										Visitar
									</Button>
								</Link>
								<Button
									variant="outline"
									className="flex-1 border-white/10 text-red-500 hover:bg-red-500/10"
									onClick={() => handleUnsubscribe(channel.id)}
								>
									Desinscrever
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
