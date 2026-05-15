"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import CustomFormField, {
   FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";

import { Form } from "@/components/ui/form";

import { useCreateComment } from "@/hooks/useVideoActions";
import { CustomSubmitButton } from "./forms-components/custom-submit-button";


interface CommentFormData {
	comment: string;
}

export function CommentInput({
	videoId,
	userAvatar,
}: {
	videoId?: string;
	userAvatar?: string | null;
}) {
	const create = useCreateComment();

	const form = useForm<CommentFormData>({
		defaultValues: {
			comment: "",
		},
	});

	async function onSubmit(data: CommentFormData) {
		if (!data.comment.trim() || !videoId) return;

		try {
			await create.mutateAsync({
				videoId,
				content: data.comment.trim(),
			});

			form.reset();
		} catch {
			toast.error("Erro ao enviar comentário.");
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex items-center gap-3 rounded-2xl border border-border px-4 py-3"
			>
				<Image
					src={userAvatar || "/default-avatar.png"}
					alt="Avatar"
					width={36}
					height={36}
					unoptimized
					className="rounded-full object-cover"
				/>

				<div className="flex-1 flex items-center gap-3">
               <div className="flex-1">
                  <CustomFormField
                     form={form}
                     name="comment"
                     fieldType={FormFieldType.INPUT}
                     label=""
                     placeholder="Adicione um comentário..."
                  />
               </div>

               <CustomSubmitButton
                  form={form}
                  className="w-24"
               >
                  Comentar
               </CustomSubmitButton>
</div>
			</form>
		</Form>
	);
}