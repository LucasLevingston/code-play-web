"use client";

import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLikeVideo, useUnlikeVideo } from "@/hooks/useVideoActions";
import { useUserStore } from "@/stores/useUserStore";
import { CustomButton } from "../custom-button";

type Props = {
	videoId: string;
	isLiked?: boolean;
	className?: string;
	children?: React.ReactNode;
};

export default function LikeVideoButton({
	videoId,
	isLiked,
	className,
	children,
}: Props) {
	const user = useUserStore((s) => s.user);

	const [liked, setLiked] = useState<boolean>(isLiked ?? false);

	const like = useLikeVideo();
	const unlike = useUnlikeVideo();

	async function handleClick() {
		if (!user) {
			toast.info("Faça login para curtir este vídeo.");
			return;
		}



		const newLikedState = !liked;
		setLiked(newLikedState);

		try {
			if (liked) {
				await unlike.mutateAsync(videoId);
			} else {
				await like.mutateAsync(videoId);
			}
		} catch (err) {
			setLiked(liked);
			toast.error("Erro ao atualizar curtida. Tente novamente.");
		}
	}

	const activeClass = liked
		? ""
		: "bg-background text-foreground";

	return (
		<CustomButton
			type="button"
			className={`${className ?? ""} ${activeClass} w-24`}
			onClick={handleClick}
			
		>
			{children}
		</CustomButton>
	);
}
