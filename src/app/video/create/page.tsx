"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Globe, Link2, Lock, UploadCloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomButton } from "@/components/custom/custom-button";
import { CustomInput } from "@/components/custom/custom-input";
import CustomFormField, {
	FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { CustomSubmitButton } from "@/components/custom/forms-components/custom-submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { useCreateVideo } from "@/hooks/useCreateVideo";
import { cn } from "@/lib/utils";

const uploadSchema = z.object({
	title: z
		.string()
		.min(3, "Título obrigatório")
		.max(100, "Máximo de 100 caracteres"),

	description: z
		.string()
		.min(10, "Descrição obrigatória")
		.max(300, "Máximo de 300 caracteres"),

	tags: z.array(z.string()).min(1, "Adicione pelo menos uma tag"),

visibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]),
})

type UploadSchema = z.infer<typeof uploadSchema>;

const thumbnails = [
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519608425089-7f3bfa6f6bb8?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
];
export default function CreatePage() {
	const [selectedThumb, setSelectedThumb] = useState(0);
	const [tagInput, setTagInput] = useState("");
	const { mutate: createVideo } = useCreateVideo();

	const form = useForm<UploadSchema>({
		resolver: zodResolver(uploadSchema),

		defaultValues: {
			title: "",
			description: "",
			tags: ["cinematic", "neon", "noir"],
			visibility: "PUBLIC",
		},
	});

	const tags = form.watch("tags");

	function addTag() {
		if (!tagInput.trim()) return;
		form.setValue("tags", [...tags, tagInput.trim()]);
		setTagInput("");
	}

	function onSubmit(data: UploadSchema) {
		createVideo({
			title: data.title,
			description: data.description,
			tags: data.tags,
			visibility: data.visibility,
			video: new File([], "video"),
			thumbnail: new File([], "thumbnail"),
		});
		console.log(data);
	}

	return (
		<div className="mx-auto max-w-7xl">
			<div className="mb-8">
				<h1 className="text-5xl font-bold tracking-tight">Upload Content</h1>

				<p className="mt-2 text-lg text-zinc-400">
					Distribute your vision to the global gallery.
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-6 lg:grid-cols-[1.2fr_420px]"
				>
					<div className="space-y-6">
						<Card className="border-zinc-800 bg-zinc-950 p-6">
							<div className="flex h-[360px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-700 text-center transition hover:border-pink-500/50">
								<div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/15">
									<UploadCloud className="h-10 w-10 text-pink-400" />
								</div>

								<h2 className="text-3xl font-semibold">
									Drag and drop video files
								</h2>

								<p className="mt-2 text-zinc-500">
									Your videos will be private until you publish them.
								</p>

								<Button className="mt-8 rounded-2xl bg-zinc-800 px-8 hover:bg-zinc-700">
									Select Files
								</Button>
							</div>
						</Card>

						<Card className="border-zinc-800 bg-zinc-950 p-5">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="rounded-xl bg-violet-500/15 p-3">
										<UploadCloud className="h-5 w-5 text-violet-400" />
									</div>

									<div>
										<p className="font-medium">cinematic_sequence_v01.mp4</p>

										<span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
											Uploading...
										</span>
									</div>
								</div>

								<span className="text-sm font-medium text-pink-400">
									78% Complete
								</span>
							</div>

							<Progress value={78} className="mt-5 h-2 bg-zinc-800" />

							<div className="mt-3 flex justify-end">
								<span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
									2 minutes remaining
								</span>
							</div>
						</Card>

						<div>
							<h3 className="mb-4 text-2xl font-semibold">
								Thumbnail Selection
							</h3>

							<div className="flex gap-4">
								{thumbnails.map((thumb, index) => (
									<button
										key={thumb}
										type="button"
										onClick={() => setSelectedThumb(index)}
										className={cn(
											"relative overflow-hidden rounded-2xl border-2 transition",
											selectedThumb === index
												? "border-pink-500"
												: "border-transparent",
										)}
									>
										{selectedThumb === index && (
											<div className="absolute inset-0 flex items-center justify-center bg-black/40">
												<div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
													<Check className="h-5 w-5" />
												</div>
											</div>
										)}
									</button>
								))}
							</div>
						</div>
					</div>

					<Card className="sticky top-6 h-fit border-zinc-800 bg-zinc-950 p-6">
						<div className="space-y-6">
							<CustomFormField
								placeholder="Give your masterpiece a name"
								fieldType={FormFieldType.INPUT}
								form={form}
								name="title"
							/>
							<CustomFormField
								fieldType={FormFieldType.TEXTAREA}
								form={form}
								name="description"
								placeholder="What is the story behind this sequence?"
							/>

							<div>
								<h1 className="mb-3 text-xs uppercase tracking-[0.25em] text-zinc-500">
									Tags
								</h1>

								<div className="mb-4 flex flex-wrap gap-2">
									{tags.map((tag) => (
										<Badge
											key={tag}
											className="rounded-full bg-violet-500/20 px-4 py-1 text-violet-300 hover:bg-violet-500/30"
										>
											#{tag}
										</Badge>
									))}
								</div>

								<div className="flex gap-2">
									<CustomInput
										value={tagInput}
										onChange={(e) => setTagInput(e.target.value)}
										placeholder="Add tags separated by commas..."
									/>

									<CustomButton type="button" onClick={addTag} className="">
										Add
									</CustomButton>
								</div>
							</div>

							<FormLabel className="text-xs uppercase tracking-[0.25em] text-zinc-500">
								Visibility
							</FormLabel>

							<div className="grid grid-cols-3 gap-3">
								<CustomButton
									type="button"
									onClick={() => form.setValue("visibility", "PUBLIC")}
									className={cn(
										"h-24 min-w-0 flex-col gap-2 rounded-2xl",
										form.getValues("visibility") === "PUBLIC"
											? ""
											: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800",
									)}
								>
									<Globe className="h-5 w-5" />

									<span className="text-xs font-semibold uppercase tracking-wider">
										Public
									</span>
								</CustomButton>

								<CustomButton
									type="button"
									onClick={() => form.setValue("visibility", "UNLISTED")}
									className={cn(
										"h-24 min-w-0 flex-col gap-2 rounded-2xl",
										form.getValues("visibility") === "UNLISTED"
											? ""
											: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800",
									)}
								>
									<Link2 className="h-5 w-5" />

									<span className="text-xs font-semibold uppercase tracking-wider">
										Unlisted
									</span>
								</CustomButton>

								<CustomButton
									type="button"
									onClick={() => form.setValue("visibility", "PRIVATE")}
									className={cn(
										"h-24 min-w-0 flex-col gap-2 rounded-2xl",
										form.getValues("visibility") === "PRIVATE"
											? ""
											: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800",
									)}
								>
									<Lock className="h-5 w-5" />

									<span className="text-xs font-semibold uppercase tracking-wider">
										Private
									</span>
								</CustomButton>
							</div>

							<div className="flex gap-4 pt-4">
								<CustomSubmitButton
									className="h-14 flex-1 bg-zinc-900 hover:bg-zinc-800"
									form={form}
								>
									Save Draft
								</CustomSubmitButton>

								<CustomSubmitButton className="h-14 flex-1" form={form}>
									Publish Video
								</CustomSubmitButton>
							</div>
						</div>
					</Card>
				</form>
			</Form>
		</div>
	);
}
