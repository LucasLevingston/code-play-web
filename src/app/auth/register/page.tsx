"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomFormField, {
	FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { CustomSubmitButton } from "@/components/custom/forms-components/custom-submit-button";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { type RegisterInput, registerSchema } from "@/schemas/auth";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Register() {
	const router = useRouter();
	const register = useAuthStore((state) => state.register);
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
			await register(data.name, data.email, data.password, Number(data.age));
			toast.success("Usuário registrado com sucesso!");
			form.reset();
			router.push("/");
		} catch {
			toast.error("Erro ao registrar usuário. Tente novamente.");
		}
	};

	return (
		<div className="flex-1 flex flex-col items-center justify-center">
			<Logo className="mb-8" />
			<Card>
				<CardHeader>
					<CardTitle>Cadastro</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4 w-[420px]"
						>
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

							<CustomSubmitButton
								disabled={form.formState.isSubmitting}
								
							>
								{form.formState.isSubmitting ? "Processando..." : "Registrar"}
							</CustomSubmitButton>

							<p className="text-center text-sm text-zinc-400">
								Já possui uma conta?{" "}
								<Link
									href="/auth/login"
									className="text-primary hover:underline"
								>
									Faça seu login
								</Link>
							</p>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
