import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { User } from "@/types/user";

async function fetchUserData(): Promise<User> {
	try {
		const { data } = await api.get("/users/me");
		return data;
	} catch {
		throw new Error("Erro ao buscar usuario");
	}
}

export function useGetUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: () => fetchUserData(),
	});
}
