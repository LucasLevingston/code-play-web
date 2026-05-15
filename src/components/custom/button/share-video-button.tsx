"use client";

import type React from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { CustomButton } from "../custom-button";
import { Share } from "lucide-react";

type Props = {
	videoId?: string;
	title?: string;
	className?: string;
	children?: React.ReactNode;
};

export default function ShareVideoButton({
	title,
	className,
	children,
}: Props) {
	async function handleShare() {
		const url = typeof window !== "undefined" ? window.location.href : "";

		if (navigator.share) {
			try {
				await navigator.share({ title: title ?? "Vídeo", url });
				return;
			} catch (err) { }
		}

		try {
			await navigator.clipboard.writeText(url);
			toast.success("Link copiado para a área de transferência!");
		} catch (err) {
			toast.error("Não foi possível copiar o link.");
		}
	}

	return (
		<CustomButton
			type="button"
			variant="ghost"
			className={cn(className, "w-32")}
			onClick={handleShare}
		>
			<Share /> Compartilhar
		</CustomButton>
	);
}
