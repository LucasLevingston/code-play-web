"use client";

import { BellCheck, Clock3, History, Home, PlusSquare, ThumbsUp } from "lucide-react";

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
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { Logo } from "./logo";

const defaultLinks = [
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
];

const galleryLinks = [
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
];

export function AppSidebar() {
	const pathname = usePathname();
	
	return (
		<Sidebar collapsible="offcanvas">
			<SidebarContent>
				<SidebarHeader className="p-4 flex itesm-center justify-center"> 
        
           <Logo />
      </SidebarHeader>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{defaultLinks.map((item) => {
								const isActive = pathname === item.url;

								return (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											className="h-11 rounded-xl transition-all"
										>
											<Link href={item.url}>
												<item.icon className="h-4 w-4" />

												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Galeria */}
				<SidebarGroup>
					<SidebarGroupLabel>Sua Galeria</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{galleryLinks.map((item) => {
								const isActive = pathname === item.url;

								return (
									<SidebarMenuItem key={item.url}>
										<SidebarMenuButton
											asChild
											isActive={isActive}
											className="h-11 rounded-xl transition-all"
										>
											<Link href={item.url}>
												<item.icon className="h-4 w-4" />

												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
