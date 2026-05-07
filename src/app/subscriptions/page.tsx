"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Channel {
	id: string;
	name: string;
	avatar: string;
	subscribers: number;
	isSubscribed: boolean;
}

const mockChannels: Channel[] = [
	{
		id: "1",
		name: "Tech Masters",
		avatar: "https://i.pravatar.cc/300?img=1",
		subscribers: 150000,
		isSubscribed: true,
	},
	{
		id: "2",
		name: "Dev World",
		avatar: "https://i.pravatar.cc/300?img=2",
		subscribers: 200000,
		isSubscribed: true,
	},
	{
		id: "3",
		name: "Web Concepts",
		avatar: "https://i.pravatar.cc/300?img=3",
		subscribers: 75000,
		isSubscribed: true,
	},
	{
		id: "4",
		name: "Code Daily",
		avatar: "https://i.pravatar.cc/300?img=4",
		subscribers: 320000,
		isSubscribed: true,
	},
	{
		id: "5",
		name: "Design Pro",
		avatar: "https://i.pravatar.cc/300?img=5",
		subscribers: 98000,
		isSubscribed: true,
	},
];

export default function SubscriptionsPage() {
	const [channels, setChannels] = useState(mockChannels);

	const handleUnsubscribe = (id: string) => {
		setChannels((prev) =>
			prev.map((ch) =>
				ch.id === id ? { ...ch, isSubscribed: false } : ch,
			),
		);
	};

	const subscribedChannels = channels.filter((ch) => ch.isSubscribed);

	return (
		<div className="px-3 py-8 lg:px-5">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white">Inscrições</h1>
				<p className="mt-2 text-sm text-zinc-400">
					{subscribedChannels.length} canal{subscribedChannels.length !== 1 ? "is" : ""}
				</p>
			</div>

			{subscribedChannels.length === 0 ? (
				<div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-white/10 py-12">
					<div className="text-center">
						<p className="text-lg font-semibold text-white">Nenhum canal inscrito</p>
						<p className="mt-1 text-sm text-zinc-400">
							Inscreva-se em canais para ver seus vídeos aqui
						</p>
					</div>
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{subscribedChannels.map((channel) => (
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