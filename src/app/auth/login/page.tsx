"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomFormField, {
	FormFieldType,
} from "@/components/custom/forms-components/custom-form-field";
import { CustomSubmitButton } from "@/components/custom/forms-components/custom-submit-button";
import { Logo } from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { type LoginInput, loginSchema } from "@/schemas/auth";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
	const router = useRouter();
	const login = useAuthStore((s) => s.login);
	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: LoginInput) {
		try {
			await login(data.email, data.password);
			router.push("/dashboard");
		} catch (err) {
			form.setError("root", { message: "Erro ao efetuar login" });
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-[80vh] gap-6">
			<Logo />
			<Card>
				<CardHeader >
					<CardTitle >Entrar</CardTitle>
					<CardDescription >
						Bem-vindo de volta ao CodePlay
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<CustomFormField
								form={form}
								name="email"
								fieldType={FormFieldType.EMAIL}
								label="E-mail"
								placeholder="seu@exemplo.com"
							/>

							<CustomFormField
								form={form}
								name="password"
								fieldType={FormFieldType.PASSWORD}
								label="Senha"
								placeholder="••••••••"
							/>
							<a
								href="/recover"
								className="block hover:text-white/80 text-sm text-right text-blue-200"
							>
								Esqueci minha senha
							</a>

							<CustomSubmitButton>
								{form.formState.isSubmitting ? "Entrando..." : "Entrar"}
							</CustomSubmitButton>

							<div className="flex gap-1 justify-center text-sm">
								<span className="text-white/60">Não tem conta? </span>
								<a href="/register" className="text-[#A68CFF] hover:underline"> 
									Registre-se
								</a>
							</div>

						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
