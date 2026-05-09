"use client";
import { Bell, Search, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { CustomButton } from "./custom/custom-button";
import { CustomInput } from "./custom/custom-input";
import { ThemeSwitcher } from "./custom/Theme-Switcher";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function Header() {
	const { user } = useUserStore();
	const loadUser = useUserStore((state) => state.loadUser);

	useEffect(() => {
		void loadUser();
	}, [loadUser]);

	return (
		<header className="flex items-center justify-between px-6 py-7  text-white border-black/10 dark:border-white/10 border-b">
			<Logo />
			<div className="hidden w-full max-w-md px-6 lg:flex">
				<CustomInput
					type="text"
					placeholder="Procure seu vídeo"
					icon={Search}
				/>
			</div>

			<div className="flex gap-2 items-center">

			<ThemeSwitcher />
			{user ? (
				<div className="flex items-center gap-3">
					<Button
						variant="ghost"
						className="hidden rounded-full border border-white/10 bg-white/5 text-[#FF8B9B] hover:bg-white/10 md:flex"
						>
						<Upload className="mr-2 h-4 w-4" />
						Upload
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="rounded-full hover:bg-white/5"
						>
						<Bell className="h-5 w-5" />
					</Button>


					<Button variant="ghost" size="icon" className="rounded-full p-0">
						{
							user.avatarUrl &&

						<Image
							src={user?.avatarUrl || "https://i.pravatar.cc/300"}
							alt="User Avatar"
							width={36}
							height={36}
							className="rounded-full border border-white/10"
							/>
						}
					</Button>
				</div>
			) : (
				<div className="flex items-center">
					<CustomButton className="w-24">Login</CustomButton>
					<CustomButton className="w-28 dark:bg-white dark:text-black">Criar conta</CustomButton>
				</div>
			)}
			</div>
		</header>
	);
}
