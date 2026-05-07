import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/QueryProvider";
import Sidebar from "@/components/sidebar";
import { Header } from "../components/header";
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
						<header className="border-b border-white/10">
							<Header />
						</header>
						<main className="flex-1 flex overflow-auto bg-gradient-to-br from-black via-zinc-700 to-black w-full p-4">
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
