"use client";

import {
	BellCheck,
	Clock3,
	History,
	Home,
	PlusSquare,
	ThumbsUp,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton
} from "@/components/ui/sidebar";

import { Logo } from "./logo";

const defaultLinks = [
	{
		title: "Menu",
		links: [
			{
				title: "Home",
				url: "/dashboard",
				icon: Home,
			},
			{
				title: "Inscrições",
				url: "/dashboard/subscriptions",
				icon: BellCheck,
			},
			{
				title: "Criar",
				url: "/dashboard/video/create",
				icon: PlusSquare,
			},
		],
	},
	{
		title: "Sua Galeria",
		links: [
			{
				title: "Histórico",
				url: "/dashboard/history",
				icon: History,
			},
			{
				title: "Vídeos Curtidos",
				url: "/dashboard/liked-videos",
				icon: ThumbsUp,
			},
			{
				title: "Assistir Depois",
				url: "/dashboard/watch-later",
				icon: Clock3,
			},
		],
	},
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="offcanvas">
			<SidebarContent>
				<SidebarHeader className="flex items-center justify-center p-4">
					<Logo />
				</SidebarHeader>

				{defaultLinks.map((group) => (
					<SidebarGroup key={group.title}>
						<SidebarGroupLabel>{group.title}</SidebarGroupLabel>

						<SidebarGroupContent>
							<SidebarMenu>
								{group.links.map((item) => {
									const isActive = pathname === item.url;

									return (
										<SidebarMenuButton
											asChild
											isActive={isActive}
											className="
		h-11 rounded-xl transition-all
		data-[active=true]:text-primary
		hover:border-primary/40
											hover:shadow-md hover:shadow-primary/5
											hover:text-primary  hover:border
	"
										>
											<Link href={item.url}>
												<item.icon className="h-6 w-6" />
												<span className="text-md">{item.title}</span>
											</Link>
										</SidebarMenuButton>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}