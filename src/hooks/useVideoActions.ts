import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";

export function useLikeVideo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (videoId: string) => {
			const { data } = await api.post(`/videos/${videoId}/like`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["liked-videos"] });
			queryClient.invalidateQueries({ queryKey: ["videos"] });
		},
	});
}

export function useUnlikeVideo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (videoId: string) => {
			const { data } = await api.delete(`/videos/${videoId}/like`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["liked-videos"] });
			queryClient.invalidateQueries({ queryKey: ["videos"] });
		},
	});
}

export function useAddToWatchLater() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (videoId: string) => {
			const { data } = await api.post(`/videos/${videoId}/watch-later`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["watch-later-videos"] });
		},
	});
}

export function useRemoveFromWatchLater() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (videoId: string) => {
			const { data } = await api.delete(`/videos/${videoId}/watch-later`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["watch-later-videos"] });
		},
	});
}

export function useAddToHistory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (videoId: string) => {
			const { data } = await api.post(`/videos/${videoId}/history`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["history-videos"] });
		},
	});
}

export function useSubscribe() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (channelId: string) => {
			const { data } = await api.post(`/subscriptions/${channelId}`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
		},
	});
}

export function useUnsubscribe() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (channelId: string) => {
			const { data } = await api.delete(`/subscriptions/${channelId}`);
			return data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
		},
	});
}
