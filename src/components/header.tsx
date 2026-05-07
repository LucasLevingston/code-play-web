"use client"
import { Bell, Search, Upload } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";
import { CustomInput } from "./custom/custom-input";
import { ThemeSwitcher } from "./custom/Theme-Switcher";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function Header() {
	const { user } = useUserStore();

	return (
        <header className="flex items-center justify-between px-6 py-7  text-white">
				<Logo />
				<div className="hidden w-full max-w-md px-6 lg:flex">
					<CustomInput
						type="text"
						placeholder="Procure seu vídeo"
						icon={Search}
					/>
				</div>

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

					<ThemeSwitcher />

					<Button variant="ghost" size="icon" className="rounded-full p-0">
						<Image
							src={user?.avatarUrl || "https://i.pravatar.cc/300"}
							alt="User Avatar"
							width={36}
							height={36}
							className="rounded-full border border-white/10"
						/>
					</Button>
				</div>
		</header>
	);
}
