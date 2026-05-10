import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLabelByFormName(name: string): string {
	const labels: Record<string, string> = {
		email: "E-mail",
		password: "Senha",
		confirmPassword: "Confirmar Senha",
		name: "Nome",
		age: "Idade",
		phone: "Telefone",
	};
	return labels[name] || name;
}

export function getPlaceholderByFormName(name: string): string {
	const placeholders: Record<string, string> = {
		email: "seu@exemplo.com",
		password: "••••••",
		confirmPassword: "••••••",
		name: "Digite seu nome",
		phone: "(11) 99999-9999",
	};
	return placeholders[name] || "";
}
