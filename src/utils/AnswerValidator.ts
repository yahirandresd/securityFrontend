import { z } from "zod";
import { Answer } from "@/models/Answer";

export class AnswerValidator {
    private static schema = z.object({
        id: z.number().int().nonnegative("El ID debe ser un número entero no negativo."),
        content: z.string().min(1, "La respuesta no puede estar vacía."),
        securityQuestion_id: z.number().int().nonnegative("El ID de la pregunta debe ser un número entero no negativo."),
        user_id: z.number().int().nonnegative("El ID del usuario debe ser un número entero no negativo."),
    });

    static validateField<K extends keyof Answer>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
