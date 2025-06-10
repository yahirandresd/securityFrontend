import { z } from "zod";
import { SecurityQuestion } from "@/models/SecurityQuestion";

export class SecurityQuestionValidator {
    private static schema = z.object({
        id: z.number().int().nonnegative("El ID debe ser un número entero no negativo."),
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
        description: z.string().min(5, "La descripción debe tener al menos 5 caracteres."),
    });

    static validateField<K extends keyof SecurityQuestion>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }

    static validateAll(data: SecurityQuestion) {
        return this.schema.safeParse(data);
    }
}
