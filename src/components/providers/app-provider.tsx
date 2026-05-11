"use client";

import { Header } from "@/components/header";

import { AppSidebar } from "@/components/sidebar";

import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar";

import { useUserStore } from "@/stores/useUserStore";

export function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useUserStore();

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full bg-background">
				{user && <AppSidebar />}

				<SidebarInset>
					<div className="flex min-h-screen flex-col">
						<Header />

						<main
							className="
								flex-1
								bg-gradient-to-br
								from-background
								via-muted/30
								to-background
							"
						>
							<div className="mx-auto w-full max-w-[1800px] p-4 md:p-6">
								{children}
							</div>
						</main>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}