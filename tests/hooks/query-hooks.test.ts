import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "@/config/api";
import { useGetChannelById } from "@/hooks/useGetChannelById";
import { useGetDashboardVideos } from "@/hooks/useGetDashboardVideos";
import { useGetHistoryVideos } from "@/hooks/useGetHistoryVideos";
import { useGetLikedVideos } from "@/hooks/useGetLikedVideos";
import { useGetNextUpVideos } from "@/hooks/useGetNextUpVideos";
import { useGetSubscriptions } from "@/hooks/useGetSubscriptions";
import { useGetUser } from "@/hooks/useGetUser";
import { useGetVideoById } from "@/hooks/useGetVideoById";
import { useGetVideos } from "@/hooks/useGetVideos";
import { useGetWatchLaterVideos } from "@/hooks/useGetWatchLaterVideos";

vi.mock("@/config/api", () => ({
	api: {
		get: vi.fn(),
	},
}));

const apiMock = api as unknown as {
	get: ReturnType<typeof vi.fn>;
};

function createWrapper() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	return function Wrapper({ children }: { children: React.ReactNode }) {
		return React.createElement(QueryClientProvider, { client: queryClient }, children);
	};
}

describe("query hooks", () => {
	beforeEach(() => {
		apiMock.get.mockReset();
	});

	it("fetches the current user", async () => {
		apiMock.get.mockResolvedValueOnce({
			data: {
				id: "user-1",
				name: "User",
				username: "user",
				email: "u@test.com",
			} as any,
		});

		const { result } = renderHook(() => useGetUser(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/users/me");
		expect(result.current.data).toMatchObject({ id: "user-1", username: "user" });
	});

	it("fetches videos with params", async () => {
		apiMock.get.mockResolvedValueOnce({ data: [{ id: "video-1" }] as any });

		const { result } = renderHook(() => useGetVideos({ page: 2, limit: 5, segment: "BACKEND" }), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/videos", { params: { page: 2, limit: 5, segment: "BACKEND" } });
		expect(result.current.data).toEqual([{ id: "video-1" }]);
	});

	it("fetches a video by id", async () => {
		apiMock.get.mockResolvedValueOnce({ data: { id: "video-1", likesCount: 3, isLiked: true } as any });

		const { result } = renderHook(() => useGetVideoById("video-1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/videos/video-1");
		expect(result.current.data).toMatchObject({ id: "video-1", likesCount: 3 });
	});

	it("does not fetch a video when id is empty", () => {
		renderHook(() => useGetVideoById(""), {
			wrapper: createWrapper(),
		});

		expect(apiMock.get).not.toHaveBeenCalled();
	});

	it("fetches subscriptions", async () => {
		apiMock.get.mockResolvedValueOnce({ data: [{ id: "channel-1", isSubscribed: true }] as any });

		const { result } = renderHook(() => useGetSubscriptions(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/subscriptions");
	});

	it("fetches liked videos with default limit", async () => {
		apiMock.get.mockResolvedValueOnce({ data: [] as any });

		const { result } = renderHook(() => useGetLikedVideos(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/videos/liked", { params: { limit: 12 } });
	});

	it("fetches watch later videos with default limit", async () => {
		apiMock.get.mockResolvedValueOnce({ data: [] as any });

		const { result } = renderHook(() => useGetWatchLaterVideos(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/videos/watch-later", { params: { limit: 8 } });
	});

	it("fetches history videos with default limit", async () => {
		apiMock.get.mockResolvedValueOnce({ data: [] as any });

		const { result } = renderHook(() => useGetHistoryVideos(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/videos/history", { params: { limit: 15 } });
	});

	it("fetches dashboard videos and returns empty array on non-401 errors", async () => {
		apiMock.get.mockRejectedValueOnce({ response: { status: 500 } });

		const { result } = renderHook(() => useGetDashboardVideos(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual([]);
	});

	it("returns an error for dashboard unauthorized responses", async () => {
		apiMock.get.mockRejectedValueOnce({ response: { status: 401 } });

		const { result } = renderHook(() => useGetDashboardVideos(), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
		expect(result.current.error).toBeInstanceOf(Error);
		expect((result.current.error as Error).message).toBe("Erro ao buscar vídeos do dashboard");
	});

	it("fetches next up videos when an id exists", async () => {
		apiMock.get.mockResolvedValueOnce({ data: [{ id: "video-2" }] as any });

		const { result } = renderHook(() => useGetNextUpVideos("video-1", 4), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/videos", {
			params: { segment: "next-up", videoId: "video-1", limit: 4 },
		});
	});

	it("does not fetch next up videos without an id", () => {
		renderHook(() => useGetNextUpVideos(undefined, 4), {
			wrapper: createWrapper(),
		});

		expect(apiMock.get).not.toHaveBeenCalled();
	});

	it("fetches a channel by id", async () => {
		apiMock.get.mockResolvedValueOnce({
			data: {
				id: "channel-1",
				name: "Channel",
				username: "channel",
				avatarUrl: null,
				subscribersCount: 2,
				isSubscribed: true,
			} as any,
		});

		const { result } = renderHook(() => useGetChannelById("channel-1"), {
			wrapper: createWrapper(),
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(apiMock.get).toHaveBeenCalledWith("/users/channel-1");
	});

	it("does not fetch a channel without an id", () => {
		renderHook(() => useGetChannelById(""), {
			wrapper: createWrapper(),
		});

		expect(apiMock.get).not.toHaveBeenCalled();
	});
});
