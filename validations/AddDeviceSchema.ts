import { z } from "zod";

export const AddDeviceSchema = z.object({
  deviceName: z
    .string()
    .min(1, { message: "El nombre del dispositivo es requerido" })
    .max(30, {
      message: "El nombre del dispositivo no puede exceder 50 caracteres",
    }),
  deviceId: z
    .string()
    .min(1, { message: "El ID del dispositivo es requerido" })
    .max(30, {
      message: "El ID del dispositivo no puede exceder 30 caracteres",
    }),
  deviceLocation: z
    .string()
    .min(1, { message: "La ubicación del dispositivo es requerida" })
    .max(50, {
      message: "La ubicación del dispositivo no puede exceder 50 caracteres",
    }),
});
