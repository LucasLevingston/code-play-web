"use client";
import { Bell, Search, Upload } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { CustomButton } from "./custom/custom-button";
import { CustomInput } from "./custom/custom-input";
import { HeaderDropdown } from "./custom/header-dropdown";
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
						<CustomButton variant="ghost" className="w-28">
							<Upload className="mr-2 h-4 w-4" />
							Upload
						</CustomButton>

						<Button
							
							className="rounded-full hover:bg-primary bg-transparent text-black dark:text-white"
						>
							<Bell className="h-5 w-5" />
						</Button>

						<HeaderDropdown user={user} />
					</div>
				) : (
					<div className="flex items-center">
						<Link href="/auth/login">
							<CustomButton className="w-24">Login</CustomButton>
						</Link>
						<Link href="/auth/register">
							<CustomButton className="w-28 dark:bg-white dark:text-black">
								Criar conta
							</CustomButton>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}
