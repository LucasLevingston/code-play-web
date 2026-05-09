import {
   BarChart,
   FileText,
   LayoutList,
   LogOut,
   MoveUpRight,
   User as UserIcon,
   Users,
} from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role, type User } from "@/types/user";

interface MenuItem {
	label: string;
	href: string;
	icon?: React.ReactNode;
	external?: boolean;
	show?: boolean;
}

interface HeaderDropdownProps {
	user: User;
}

export function HeaderDropdown({ user }: HeaderDropdownProps) {
	const { logout } = useAuthStore();

	const menuItems: MenuItem[] = [
		{
			label: "Meus Dados",
			href: "/configuracoes/minhas-informacoes",
			icon: <UserIcon className="h-4 w-4" />,
		},

		{
			label: "Gerenciar Programas",
			href: "/programs",
			icon: <LayoutList className="h-4 w-4" />,
		},
		{
			label: "Relatórios",
			href: "/reports",
			icon: <BarChart className="h-4 w-4" />,
		},
		{
			label: "Termos e Políticas",
			href: "/terms",
			icon: <FileText className="h-4 w-4" />,
			external: false,
		},
	];
	const adminMenuItems: MenuItem[] = [
		{
			label: "Gerenciar Usuários",
			href: "/admin/users",
			icon: <Users className="h-4 w-4" />,
			show: user?.role === Role.ADMIN,
		},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="relative h-8 w-8 cursor-pointer rounded-full"
					variant="ghost"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage
							alt={user?.name || "User"}
							src={
								user?.avatarUrl ||
								"/placeholder.svg?height=72&width=72&query=user avatar"
							}
						/>
						<AvatarFallback>
							{user?.name ? (
								user.name.charAt(0).toUpperCase()
							) : (
								<UserIcon className="h-4 w-4" />
							)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{user?.name}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{user?.email}
						</p>
						<p className="text-muted-foreground text-xs leading-none">
							{user?.role}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{menuItems.map((item) =>
						item.show === undefined || item.show ? (
							<DropdownMenuItem asChild key={item.label}>
								<Link
									target={item.external ? "_blank" : "_self"}
									href={item.href}
								>
									{item.icon}
									<span>{item.label}</span>
									{item.external && <MoveUpRight className="ml-auto h-4 w-4" />}
								</Link>
							</DropdownMenuItem>
						) : null,
					)}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				{user.role === Role.ADMIN && (
					<>
						<DropdownMenuLabel className="font-normal">
							Administração
						</DropdownMenuLabel>
						<DropdownMenuGroup>
							{adminMenuItems.map((item) =>
								item.show === undefined || item.show ? (
									<DropdownMenuItem asChild key={item.label}>
										<Link
											target={item.external ? "_blank" : "_self"}
											href={item.href}
										>
											{item.icon}
											<span>{item.label}</span>
											{item.external && (
												<MoveUpRight className="ml-auto h-4 w-4" />
											)}
										</Link>
									</DropdownMenuItem>
								) : null,
							)}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</>
				)}
				<DropdownMenuItem onClick={logout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
