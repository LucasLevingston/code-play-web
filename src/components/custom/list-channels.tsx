"use client";



import { useUnsubscribe } from "@/hooks/useVideoActions";

import type { Channel } from "@/types/user";

import ChannelCard from "./channel-card";

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
				return (
					<ChannelCard key={channel.id} channel={channel} />
				);
			})}
		</div>
	);
}