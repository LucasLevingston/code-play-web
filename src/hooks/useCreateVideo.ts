import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";

interface CreateVideoInput {
	title: string;
	description: string;
	tags: string[];
	visibility: "PUBLIC" | "UNLISTED" | "PRIVATE";
	video: File;
	thumbnail: File;
}

async function createVideo(data: CreateVideoInput) {
	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("description", data.description);
	formData.append("tags", JSON.stringify(data.tags));
	formData.append("visibility", data.visibility);
	formData.append("video", data.video);
	formData.append("thumbnail", data.thumbnail);

	try {
		const { data: response } = await api.post("/videos", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response;
	} catch {
		throw new Error("Erro ao criar vídeo");
	}
}

export function useCreateVideo() {
	return useMutation({
		mutationFn: (data: CreateVideoInput) => createVideo(data),
	});
}
