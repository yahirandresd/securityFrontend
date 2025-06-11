import { z } from "zod";
import { Devise } from "@/models/Devise";

export class DeviseValidator {
    private static schema = z.object({
        id: z.number().int().nonnegative("El ID debe ser un número entero no negativo."),
        name: z.string().min(1, "El nombre del dispositivo no puede estar vacío."),
        ip: z.string().min(7, "La dirección IP no puede estar vacía."), // Mínimo 7 caracteres tipo "0.0.0.0"
        operating_system: z.string().min(1, "El sistema operativo no puede estar vacío."),
        user_id: z.number().int().nonnegative("El ID del usuario debe ser un número entero no negativo."),
    });

    static validateField<K extends keyof Devise>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
