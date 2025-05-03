import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Correo electrónico inválido" })
    .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(100, { message: "La contraseña debe tener menos de 100 caracteres" }),
});
