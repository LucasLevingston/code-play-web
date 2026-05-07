"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomFormField, {
	FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { CustomSubmitButton } from "@/components/custom/forms-components/custom-submit-button";
import { Form } from "@/components/ui/form";
import { type RecoverInput, recoverSchema } from "@/schemas/auth";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RecoverPage() {
	const router = useRouter();
	const recover = useAuthStore((s) => s.recover);
	const form = useForm<RecoverInput>({
		resolver: zodResolver(recoverSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: RecoverInput) {
		try {
			await recover(data.email);
			form.reset();
			router.push("/login");
		} catch (err) {
			form.setError("root", { message: "Erro ao solicitar recuperação" });
		}
	}

	return (
		<div className="flex items-center justify-center h-[80vh]">
			<div className="w-[420px] p-8 bg-[#0b0b0b] rounded space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white mb-2">
						Recuperar senha
					</h2>
					<p className="text-white/60 text-sm">
						Informe seu e-mail para receber instruções
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<CustomFormField
							form={form}
							name="email"
							fieldType={FormFieldType.EMAIL}
							label="E-mail"
							placeholder="seu@exemplo.com"
						/>

						<CustomSubmitButton className="w-full bg-[#FF8B9B] hover:bg-[#ff7a8a] text-black font-semibold py-2 rounded">
							{form.formState.isSubmitting ? "Enviando..." : "Enviar"}
						</CustomSubmitButton>

						<a
							href="/login"
							className="block text-center text-white/60 hover:text-white/80 text-sm"
						>
							Voltar ao login
						</a>
					</form>
				</Form>
			</div>
		</div>
	);
}
