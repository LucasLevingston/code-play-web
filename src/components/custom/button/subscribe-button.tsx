"use client";

import { useState } from "react";

import { Check, Plus } from "lucide-react";

import { toast } from "react-toastify";

import { useSubscribe, useUnsubscribe } from "@/hooks/useVideoActions";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/useUserStore";

import { CustomButton } from "../custom-button";

type Props = {
	channelId: string;
	isSubscribed?: boolean;
	className?: string;
};

export default function SubscribeButton({
	channelId,
	isSubscribed = false,
	className,
}: Props) {
	const user = useUserStore((s) => s.user);

	const [subscribed, setSubscribed] =
		useState<boolean>(isSubscribed);

	const subscribe = useSubscribe();
	const unsubscribe = useUnsubscribe();

	const isOwnChannel = user?.id === channelId;

	async function handleClick() {
		if (!user) {
			toast.info(
				"Faça login para se inscrever neste canal.",
			);

			return;
		}

		if (isOwnChannel) {
			toast.info(
				"Você não pode se inscrever no seu próprio canal.",
			);

			return;
		}

		const nextState = !subscribed;

		setSubscribed(nextState);

		try {
			if (subscribed) {
				await unsubscribe.mutateAsync(channelId);
			} else {
				await subscribe.mutateAsync(channelId);
			}
		} catch {
			setSubscribed(!nextState);

			toast.error(
				"Erro ao atualizar inscrição. Tente novamente.",
			);
		}
	}

	return (
		<CustomButton
			type="button"
			variant={subscribed ? "secondary" : "default"}
			className={cn(
				"w-36 rounded-2xl transition-all",
				className,
			)}
			onClick={handleClick}
			disabled={
				subscribe.isPending ||
				unsubscribe.isPending ||
				isOwnChannel
			}
		>
			<div className="flex items-center gap-2">
				{subscribed ? (
					<>
						<Check className="h-4 w-4" />

						<span>Inscrito</span>
					</>
				) : (
					<>
						<Plus className="h-4 w-4" />

						<span>Inscrever-se</span>
					</>
				)}
			</div>
		</CustomButton>
	);
}