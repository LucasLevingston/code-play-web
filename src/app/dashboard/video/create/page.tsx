"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ImageIcon, UploadCloud, VideoIcon, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomButton } from "@/components/custom/custom-button";
import { CustomInput } from "@/components/custom/custom-input";
import CustomFormField, {
	FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { CustomSubmitButton } from "@/components/custom/forms-components/custom-submit-button";
import PageHeader from "@/components/custom/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { useCreateVideo } from "@/hooks/useCreateVideo";
import { cn } from "@/lib/utils";
import { visibilityOptions } from "@/types/visibility-options";

const uploadSchema = z.object({
	title: z
		.string()
		.min(3, "O título deve ter no mínimo 3 caracteres")
		.max(100, "O título deve ter no máximo 100 caracteres"),

	description: z
		.string()
		.min(10, "A descrição deve ter no mínimo 10 caracteres")
		.max(500, "A descrição deve ter no máximo 500 caracteres"),

	tags: z.array(z.string()).min(1, "Adicione pelo menos uma tag"),

	visibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]),
});

type UploadSchema = z.infer<typeof uploadSchema>;

export default function CreatePage() {
	const [tagInput, setTagInput] = useState("");

	const [videoFile, setVideoFile] = useState<File | null>(null);

	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

	const [thumbnailPreview, setThumbnailPreview] = useState("");

	const videoInputRef = useRef<HTMLInputElement | null>(null);

	const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

	const { mutate: createVideo, isPending } = useCreateVideo();

	const form = useForm<UploadSchema>({
		resolver: zodResolver(uploadSchema),

		defaultValues: {
			title: "",
			description: "",
			tags: [],
			visibility: "PUBLIC",
		},
	});

	const tags = form.watch("tags");

	function addTag() {
		const normalizedTag = tagInput.trim().replace(/\s+/g, "-");

		if (!normalizedTag) return;

		if (tags.includes(normalizedTag)) {
			setTagInput("");
			return;
		}

		form.setValue("tags", [...tags, normalizedTag]);

		setTagInput("");
	}

	function removeTag(tagToRemove: string) {
		form.setValue(
			"tags",
			tags.filter((tag) => tag !== tagToRemove),
		);
	}

	function handleVideoChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) return;

		setVideoFile(file);
	}

	function handleThumbnailChange(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];

		if (!file) return;

		setThumbnailFile(file);

		const previewUrl = URL.createObjectURL(file);

		setThumbnailPreview(previewUrl);
	}

	function onSubmit(data: UploadSchema) {
		if (!videoFile) {
			form.setError("root", {
				message: "Selecione um vídeo.",
			});

			return;
		}

		if (!thumbnailFile) {
			form.setError("root", {
				message: "Selecione uma thumbnail.",
			});

			return;
		}

		createVideo({
			title: data.title,
			description: data.description,
			tags: data.tags,
			visibility: data.visibility,
			video: videoFile,
			thumbnail: thumbnailFile,
		});
	}

	return (
		<div className="space-y-4">
			<PageHeader
				title="Enviar Vídeo"
				description="Compartilhe seus conteúdos com a comunidade."
				icon={<VideoIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
			/>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-6 xl:grid-cols-[1fr_430px]"
				>
					{/* Uploads */}
					<div className="space-y-6">
						{/* Vídeo */}
						<Card className="border-border bg-card p-6 shadow-sm">
							<div className="rounded-3xl border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/40">
								<div className="flex flex-col items-center justify-center text-center">
									<div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
										<VideoIcon className="h-10 w-10 text-primary" />
									</div>

									<h2 className="text-2xl font-semibold text-foreground">
										Selecione seu vídeo
									</h2>

									<p className="mt-2 max-w-md text-sm text-muted-foreground">
										Envie arquivos nos formatos MP4, MOV ou WEBM.
									</p>

									<input
										type="file"
										accept="video/*"
										ref={videoInputRef}
										className="hidden"
										onChange={handleVideoChange}
									/>

									<Button
										type="button"
										size="lg"
										onClick={() => videoInputRef.current?.click()}
										className="mt-6 rounded-2xl"
									>
										<UploadCloud className="mr-2 h-4 w-4" />
										Escolher vídeo
									</Button>

									{videoFile && (
										<div className="mt-6 flex w-full max-w-xl items-center justify-between rounded-2xl border border-border bg-background px-4 py-4">
											<div className="flex items-center gap-3">
												<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
													<VideoIcon className="h-5 w-5 text-primary" />
												</div>

												<div className="text-left">
													<p className="line-clamp-1 text-sm font-medium text-foreground">
														{videoFile.name}
													</p>

													<p className="text-xs text-muted-foreground">
														{(videoFile.size / 1024 / 1024).toFixed(2)} MB
													</p>
												</div>
											</div>

											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
												<Check className="h-4 w-4" />
											</div>
										</div>
									)}
								</div>
							</div>
						</Card>

						{/* Thumbnail */}
						<Card className="border-border bg-card p-6 shadow-sm">
							<div className="rounded-3xl border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/40">
								<div className="flex flex-col items-center justify-center text-center">
									<div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
										<ImageIcon className="h-10 w-10 text-primary" />
									</div>

									<h2 className="text-2xl font-semibold text-foreground">
										Thumbnail do vídeo
									</h2>

									<p className="mt-2 max-w-md text-sm text-muted-foreground">
										Escolha uma imagem atrativa para representar seu vídeo.
									</p>

									<input
										type="file"
										accept="image/*"
										ref={thumbnailInputRef}
										className="hidden"
										onChange={handleThumbnailChange}
									/>

									<Button
										type="button"
										size="lg"
										onClick={() => thumbnailInputRef.current?.click()}
										className="mt-6 rounded-2xl"
									>
										<UploadCloud className="mr-2 h-4 w-4" />
										Escolher thumbnail
									</Button>

									{thumbnailPreview && (
										<div className="relative mt-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-border shadow-md">
											<Image
												src={thumbnailPreview}
												alt="Thumbnail preview"
												width={1200}
												height={675}
												className="aspect-video w-full object-cover"
											/>

											<div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
												<Check className="h-5 w-5" />
											</div>
										</div>
									)}
								</div>
							</div>
						</Card>
					</div>

					{/* Sidebar */}
					<Card className="h-fit border-border bg-card p-6 shadow-sm xl:sticky xl:top-6">
						<div className="space-y-6">
							<CustomFormField
								fieldType={FormFieldType.INPUT}
								form={form}
								name="title"
								label="Título"
								placeholder="Digite o título do vídeo"
							/>

							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								form={form}
								name="description"
								label="Descrição"
								placeholder="Descreva seu vídeo"
							/>

							{/* Tags */}
							<div>
								<FormLabel className="mb-3 block text-sm font-medium text-foreground">
									Tags
								</FormLabel>

								<div className="mb-4 flex flex-wrap gap-2">
									{tags.map((tag) => (
										<Badge
											key={tag}
											className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-foreground"
										>
											#{tag}
											<button
												type="button"
												onClick={() => removeTag(tag)}
												className="opacity-70 transition hover:opacity-100"
											>
												<X className="h-3 w-3" />
											</button>
										</Badge>
									))}
								</div>

								<div className="flex gap-2">
									<CustomInput
										value={tagInput}
										onChange={(e) => setTagInput(e.target.value)}
										placeholder="Adicionar tag"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												addTag();
											}
										}}
									/>

									<CustomButton type="button" onClick={addTag} className="w-24">
										Adicionar
									</CustomButton>
								</div>
							</div>

							{/* Visibilidade */}
							<div>
								<FormLabel className="mb-3 block text-sm font-medium text-foreground">
									Visibilidade
								</FormLabel>

								<div className="grid grid-cols-3 gap-3">
									{visibilityOptions.map((option) => {
										const Icon = option.icon;

										const isSelected =
											form.watch("visibility") === option.value;

										return (
											<button
												key={option.value}
												type="button"
												onClick={() =>
													form.setValue("visibility", option.value)
												}
												className={cn(
													"flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border transition-all",
													isSelected
														? "border-primary bg-primary/10 text-primary"
														: "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-muted",
												)}
											>
												<Icon className="h-5 w-5" />

												<span className="text-xs font-semibold uppercase tracking-wide">
													{option.label}
												</span>
											</button>
										);
									})}
								</div>
							</div>

							{/* Erro */}
							{form.formState.errors.root && (
								<div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
									{form.formState.errors.root.message}
								</div>
							)}

							{/* Submit */}
							<div className="pt-2">
								<CustomSubmitButton
									form={form}
									disabled={isPending}
									className="h-12 rounded-2xl text-base font-semibold"
								>
									{isPending ? "Enviando vídeo..." : "Publicar vídeo"}
								</CustomSubmitButton>
							</div>
						</div>
					</Card>
				</form>
			</Form>
		</div>
	);
}
