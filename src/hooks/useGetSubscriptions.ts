import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import type { Channel } from "@/types/user";

async function fetchSubscriptions(): Promise<Channel[]> {
	try {
		const { data } = await api.get("/subscriptions");
		return data;
	} catch {
		throw new Error("Erro ao buscar inscrições");
	}
}

export function useGetSubscriptions() {
	return useQuery({
		queryKey: ["subscriptions"],
		queryFn: () => fetchSubscriptions(),
	});
}
