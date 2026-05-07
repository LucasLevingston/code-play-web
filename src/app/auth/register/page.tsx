"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomFormField, {
   FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { type RegisterInput, registerSchema } from "@/schemas/auth";

export default function Register() {
	const form = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			age: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: RegisterInput) => {
		try {
			await api.post("/api/users/register", {
				name: data.name,
				age: Number(data.age),
				email: data.email,
				password: data.password,
			});
			toast.success("Usuário registrado com sucesso!");
			form.reset();
		} catch {
			toast.error("Erro ao registrar usuário. Tente novamente.");
		}
	};

	return (
		<div className="flex-1 flex flex-col items-center justify-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-[420px]"
				>
					<h1 className="text-2xl font-bold text-white mb-6">Cadastro</h1>

					<div className="grid gap-4 sm:grid-cols-2">
						<CustomFormField
							form={form}
							fieldType={FormFieldType.INPUT}
							name="name"
							label="Nome"
						/>
						<CustomFormField
							form={form}
							fieldType={FormFieldType.INPUT}
							name="age"
							label="Idade"
						/>
					</div>

					<CustomFormField
						form={form}
						fieldType={FormFieldType.EMAIL}
						name="email"
						label="E-mail"
					/>
					<CustomFormField
						form={form}
						fieldType={FormFieldType.PASSWORD}
						name="password"
						label="Senha"
					/>
					<CustomFormField
						form={form}
						fieldType={FormFieldType.PASSWORD}
						name="confirmPassword"
						label="Confirmar Senha"
					/>

					<Button
						disabled={form.formState.isSubmitting}
						className="w-full bg-[#FF8B9B]"
					>
						{form.formState.isSubmitting ? "Processando..." : "Registrar"}
					</Button>

					<p className="text-center text-sm text-zinc-400">
						Já possui uma conta?{" "}
						<Link href="/auth/login" className="text-[#FF8B9B] hover:underline">
							Faça seu login
						</Link>
					</p>
				</form>
			</Form>
		</div>
	);
}
