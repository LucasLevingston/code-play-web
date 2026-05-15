"use client";

import { Bell, Menu, Search, Upload } from "lucide-react";

import Link from "next/link";
import { useEffect } from "react";

import { useUserStore } from "@/stores/useUserStore";

import { CustomButton } from "./custom/custom-button";
import { CustomInput } from "./custom/custom-input";
import { HeaderDropdown } from "./custom/header-dropdown";
import { ThemeSwitcher } from "./custom/Theme-Switcher";
import { Logo } from "./logo";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";

import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
	const { user } = useUserStore();

	const loadUser = useUserStore((state) => state.loadUser);

	useEffect(() => {
		void loadUser();
	}, [loadUser]);

	return (
		<header
			className="
				sticky top-0 z-50
				flex items-center justify-between
				border-b border-black/10
				bg-white/80 px-3 py-4
				backdrop-blur-xl

				dark:border-white/10
				dark:bg-black/70

				sm:px-6
			"
		>
			{/* Left */}
			<div className="flex items-center gap-2">
				<SidebarTrigger />

				<Separator
					orientation="vertical"
					className="hidden h-6 sm:block"
				/>

				<Logo />
			</div>

			{/* Desktop Search */}
			<div className="hidden w-full max-w-md px-6 lg:flex">
				<CustomInput
					type="text"
					placeholder="Procure seu vídeo"
					icon={Search}
				/>
			</div>

			<div className="hidden items-center gap-3 lg:flex">
				<ThemeSwitcher />

				{user ? (
					<>
						<Link href="/dashboard/video/create">
							<CustomButton
								variant="ghost"
								className="w-32"
							>
								<Upload className="mr-2 h-4 w-4" />
								Upload
							</CustomButton>
						</Link>

						<Button
							size="icon"
							className="
								h-11 w-11 rounded-2xl
								border border-border
								bg-background/60
								text-foreground
								backdrop-blur

								hover:bg-primary/10
								hover:text-primary
							"
						>
							<Bell className="h-5 w-5" />
						</Button>

						<HeaderDropdown user={user} />
					</>
				) : (
					<div className="flex items-center gap-2">
						<Link href="/auth/login">
							<CustomButton className="w-28">
								Login
							</CustomButton>
						</Link>

						<Link href="/auth/register">
							<CustomButton
								className="
									w-28
									bg-transparent dark:text-white
text-black border-primary hover:bg-primary/10
								"
							>
								Criar conta
							</CustomButton>
						</Link>
					</div>
				)}
			</div>

			<div className="flex items-center gap-2 lg:hidden">
				<ThemeSwitcher />

				<Sheet>
					<SheetTrigger asChild>
						<Button
							size="icon"
							className="
								h-10 w-10 rounded-2xl
								border border-border
								bg-background/60
								text-foreground
								backdrop-blur

								hover:bg-primary/10
								hover:text-primary
							"
						>
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>

					<SheetContent
						side="right"
						className="
							w-[320px]
							border-l border-border

							bg-background/95
							backdrop-blur-xl
						"
					>
						<SheetHeader>
							<SheetTitle>
								<div className="flex items-center gap-2">
									<Logo />
								</div>
							</SheetTitle>
						</SheetHeader>

						<div className="mt-8 space-y-6">
							<CustomInput
								type="text"
								placeholder="Procure seu vídeo"
								icon={Search}
							/>

							{user ? (
								<div className="space-y-3">
									<Link
										href="/dashboard/video/create"
										className="block"
									>
										<Button
											className="
												h-12 w-full justify-start
												rounded-2xl
											"
										>
											<Upload className="mr-2 h-4 w-4" />
											Upload de vídeo
										</Button>
									</Link>

									<Button
										variant="outline"
										className="
											h-12 w-full justify-start
											rounded-2xl
										"
									>
										<Bell className="mr-2 h-4 w-4" />
										Notificações
									</Button>

									<div className="pt-4">
										<HeaderDropdown user={user} />
									</div>
								</div>
							) : (
								<div className="flex flex-col gap-3">
									<Link href="/auth/login">
										<Button
											variant="outline"
											className="
												h-12 w-full rounded-2xl
											"
										>
											Login
										</Button>
									</Link>

									<Link href="/auth/register">
										<Button
											className="
												h-12 w-full rounded-2xl
												bg-primary text-white

												hover:bg-secondary
											"
										>
											Criar conta
										</Button>
									</Link>
								</div>
							)}
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}