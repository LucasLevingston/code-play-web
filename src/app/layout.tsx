import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import QueryProvider from "@/components/QueryProvider";
import Sidebar from "@/components/sidebar";
import { ToastProvider } from "../components/ToastProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Code Play",
	description: "Code Play",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-screen">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<QueryProvider>
						<ToastProvider />
						<div className="flex min-h-screen w-full">
							<div className="flex min-w-0 flex-1 flex-col">
									<Header />
								<main className="flex-1 flex overflow-auto bg-gradient-to-br from-white via-neutral-300 to-white w-full dark:bg-gradient-to-br dark:from-black dark:via-zinc-700 dark:to-black">
									<Sidebar />
									{children}
								</main>
							</div>
						</div>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
