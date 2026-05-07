"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomFormField, {
	FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import {
	type CreateVideoInput,
	createVideoSchema,
} from "@/schemas/create-video";

const segments = [
	{ value: "BACKEND", label: "Backend" },
	{ value: "FRONTEND", label: "Frontend" },
	{ value: "FULLSTACK", label: "Full Stack" },
	{ value: "ARTIFICIAL_INTELLIGENCE", label: "IA" },
	{ value: "DATA_SCIENCE", label: "Data Science" },
	{ value: "DEVOPS", label: "DevOps" },
];

export default function CreatePage() {
	const [videoPreview, setVideoPreview] = useState<string | null>(null);
	const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

	const form = useForm<CreateVideoInput>({
		resolver: zodResolver(createVideoSchema),
		defaultValues: {
			title: "",
			description: "",
			tags: "",
			segment: "BACKEND",
		},
	});

	const onSubmit = async (data: CreateVideoInput) => {
		try {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("tags", data.tags);
			formData.append("segment", data.segment);
			formData.append("thumbnail", data.thumbnail);
			formData.append("video", data.video);

			await api.post("/videos", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			toast.success("Vídeo enviado com sucesso!");
			form.reset();
			setVideoPreview(null);
			setThumbnailPreview(null);
		} catch {
			toast.error("Erro ao enviar vídeo");
		}
	};

	return (
		<div className="px-3 py-8 lg:px-5">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-white">Upload de Vídeo</h1>
				<p className="mt-2 text-sm text-zinc-400">
					Compartilhe seu conteúdo com a comunidade
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="max-w-2xl space-y-6"
				>
					{/* Vídeo Upload */}
					<div className="rounded-lg border-2 border-dashed border-white/10 p-8">
						<label className="cursor-pointer">
							<div className="flex flex-col items-center gap-3">
								<Upload className="h-8 w-8 text-[#FF8B9B]" />
								<div className="text-center">
									<p className="font-semibold text-white">
										Clique ou arraste seu vídeo
									</p>
									<p className="text-xs text-zinc-400">
										MP4, WebM ou Ogg (máx 1GB)
									</p>
								</div>
							</div>
							<input
								type="file"
								accept="video/*"
								className="hidden"
								{...form.register("video")}
								onChange={(e) => {
									form.register("video").onChange?.(e);
									if (e.target.files?.[0]) {
										setVideoPreview(URL.createObjectURL(e.target.files[0]));
									}
								}}
							/>
						</label>
						{videoPreview && (
							<div className="mt-4 flex items-center justify-between rounded bg-white/5 p-3">
								<p className="text-sm text-zinc-300">Vídeo selecionado</p>
								<button
									type="button"
									onClick={() => {
										setVideoPreview(null);
										form.resetField("video");
									}}
								>
									<X className="h-4 w-4 text-zinc-400" />
								</button>
							</div>
						)}
						{form.formState.errors.video && (
							<p className="mt-2 text-xs text-red-500">
								{form.formState.errors.video.message}
							</p>
						)}
					</div>

					{/* Thumbnail Upload */}
					<div className="rounded-lg border-2 border-dashed border-white/10 p-8">
						<label className="cursor-pointer">
							<div className="flex flex-col items-center gap-3">
								<Upload className="h-8 w-8 text-[#FF8B9B]" />
								<div className="text-center">
									<p className="font-semibold text-white">
										Clique ou arraste sua capa
									</p>
									<p className="text-xs text-zinc-400">
										PNG ou JPG (recomendado 1280x720)
									</p>
								</div>
							</div>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								{...form.register("thumbnail")}
								onChange={(e) => {
									form.register("thumbnail").onChange?.(e);
									if (e.target.files?.[0]) {
										setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
									}
								}}
							/>
						</label>
						{thumbnailPreview && (
							<div className="mt-4 flex items-center justify-between rounded bg-white/5 p-3">
								<p className="text-sm text-zinc-300">Capa selecionada</p>
								<button
									type="button"
									onClick={() => {
										setThumbnailPreview(null);
										form.resetField("thumbnail");
									}}
								>
									<X className="h-4 w-4 text-zinc-400" />
								</button>
							</div>
						)}
						{form.formState.errors.thumbnail && (
							<p className="mt-2 text-xs text-red-500">
								{form.formState.errors.thumbnail.message}
							</p>
						)}
					</div>

					{/* Title */}
					<CustomFormField
						form={form}
						name="title"
						fieldType={FormFieldType.INPUT}
						label="Título do vídeo"
					/>

					{/* Description */}
					<CustomFormField
						form={form}
						name="description"
						fieldType={FormFieldType.TEXTAREA}
						label="Descrição"
					/>

					{/* Tags */}
					<CustomFormField
						form={form}
						name="tags"
						fieldType={FormFieldType.INPUT}
						label="Tags (separadas por vírgula)"
					/>

					{/* Segment */}
					<div>
						<h1 className="block text-sm font-medium text-white mb-2">
							Categoria
						</h1>
						<select
							{...form.register("segment")}
							className="w-full rounded-lg bg-[#111] border border-[#262626] px-4 py-2.5 text-white placeholder-zinc-600 outline-none transition focus:border-[#FF8B9B]"
						>
							{segments.map((seg) => (
								<option key={seg.value} value={seg.value}>
									{seg.label}
								</option>
							))}
						</select>
					</div>

					{/* Submit */}
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						className="w-full bg-[#FF8B9B] hover:bg-[#FF7389] text-black font-semibold"
					>
						{form.formState.isSubmitting ? "Enviando..." : "Publicar Vídeo"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
