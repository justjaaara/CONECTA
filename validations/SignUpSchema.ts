import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Correo electrónico inválido" })
      .max(100, { message: "El correo debe tener menos de 100 caracteres" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(100, {
        message: "La contraseña debe tener menos de 100 caracteres",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .max(100, {
        message: "La contraseña debe tener menos de 100 caracteres",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
