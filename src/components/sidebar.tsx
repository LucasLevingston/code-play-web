"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface MenuItem {
	href: string;
	label: string;
	icon: ReactNode;
}

const defaultLinks: MenuItem[] = [
	{ href: "/dashboard", label: "Home", icon: <Home width={18} height={18} /> },
	{
		href: "/dashboard/subscriptions",
		label: "Inscrições",
		icon: (
			<Image
				alt="subscriptions icon"
				src="/subscriptionsIcon.svg"
				width={16}
				height={16}
			/>
		),
	},
	{
		href: "/dashboard/video/create",
		label: "Criar",
		icon: (
			<Image alt="create icon" src="/createIcon.svg" width={16} height={16} />
		),
	},
];

const yourGaleryLinks: MenuItem[] = [
	{
		href: "/dashboard/history",
		label: "Histórico",
		icon: (
			<Image alt="history icon" src="/historyIcon.svg" width={16} height={16} />
		),
	},
	{
		href: "/dashboard/liked-videos",
		label: "Vídeos Curtidos",
		icon: (
			<Image
				alt="liked videos icon"
				src="/likedVideosIcon.svg"
				width={16}
				height={16}
			/>
		),
	},
	{
		href: "/dashboard/watch-later",
		label: "Assistir Depois",
		icon: (
			<Image
				alt="watch later icon"
				src="/watchLaterIcon.svg"
				width={16}
				height={16}
			/>
		),
	},
];

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<aside className="w-64 border-r dark:border-white/10 border-black/10  px-4 py-4">
			<nav className="flex flex-col gap-4">
				<div>
					{defaultLinks.map((item) => {
						const isActive = pathname === item.href;
						console.log(pathname);

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-3 ${
									isActive ? "text-primary" : "dark:text-[#ADAAAA] text-black"
								}`}
							>
								<p className="text-black dark:text-white">{item.icon}</p>
								{item.label}
							</Link>
						);
					})}
				</div>
				<p className="">Sua Galeria</p>
				<div>
					{yourGaleryLinks.map((item) => {
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-3 ${
									isActive ? "text-primary" : "dark:text-[#ADAAAA] text-black"
								}`}
							>
								{item.icon}
								{item.label}
							</Link>
						);
					})}
				</div>
			</nav>
		</aside>
	);
};

export default Sidebar;
