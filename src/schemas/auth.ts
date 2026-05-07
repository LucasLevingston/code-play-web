import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().email({ message: "E-mail inválido" }),
   password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

export const recoverSchema = z.object({
   email: z.string().email({ message: "E-mail inválido" }),
});

export const registerSchema = z
   .object({
      name: z.string().min(1, { message: "Nome é obrigatório" }),
      age: z.string().min(1, { message: "Idade é obrigatória" }),
      email: z.string().email({ message: "E-mail inválido" }),
      password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
      confirmPassword: z.string().min(6, { message: "Confirmação de senha é obrigatória" }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não conferem",
      path: ["confirmPassword"],
   });

export type LoginInput = z.infer<typeof loginSchema>;
export type RecoverInput = z.infer<typeof recoverSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
