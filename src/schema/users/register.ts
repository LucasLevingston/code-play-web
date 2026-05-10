import { z } from "zod";

export const registerUserSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	age: z.string().min(2, "A idade mínima é 10 anos"),
	email: z.email("Email inválido"),
	password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export type IRegisterUserSchema = z.infer<typeof registerUserSchema>;
