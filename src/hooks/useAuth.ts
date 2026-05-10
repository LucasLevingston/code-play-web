import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useAuthStore } from "@/stores/useAuthStore";

interface RegisterInput {
	name: string;
	email: string;
	password: string;
	age: number;
}

interface LoginInput {
	email: string;
	password: string;
}

export function useRegister() {
	const register = useAuthStore((state) => state.register);

	return useMutation({
		mutationFn: async (data: RegisterInput) => {
			await register(data.name, data.email, data.password, data.age);
		},
	});
}

export function useLogin() {
	const login = useAuthStore((state) => state.login);

	return useMutation({
		mutationFn: async (data: LoginInput) => {
			await login(data.email, data.password);
		},
	});
}
