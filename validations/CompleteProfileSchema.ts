import { z } from "zod";

export const profileSchema = z.object({
  profileName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  profileSurname: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  profileUsername: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
  profilePhone: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 caracteres"),
});
