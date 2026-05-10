import { z } from "zod";

export const createVideoSchema = z.object({
	title: z.string().min(3, "Título deve ter pelo menos 3 caracteres").max(100),
	description: z
		.string()
		.min(10, "Descrição deve ter pelo menos 10 caracteres")
		.max(5000),
	tags: z.string().min(1, "Adicione pelo menos uma tag"),
	segment: z.enum([
		"BACKEND",
		"FRONTEND",
		"FULLSTACK",
		"ARTIFICIAL_INTELLIGENCE",
		"DATA_SCIENCE",
		"DEVOPS",
	]),
	thumbnail: z.instanceof(File, { message: "Selecione uma imagem" }),
	video: z.instanceof(File, { message: "Selecione um vídeo" }),
});

export type CreateVideoInput = z.infer<typeof createVideoSchema>;
