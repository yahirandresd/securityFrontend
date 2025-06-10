import { z } from "zod";
import { DigitalSignature } from "@/models/DigitalSignature";

export class DigitalSignatureValidator {
    private static schema = z.object({
        id: z.number().int().nonnegative("El ID debe ser un número entero no negativo."),
        photo: z.string().min(1, "La foto de la firma no puede estar vacía."),
        user_id: z.number().int().nonnegative("El ID del usuario debe ser un número entero no negativo."),
    });

    static validateField<K extends keyof DigitalSignature>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }

    static validateAll(data: DigitalSignature) {
        return this.schema.safeParse(data);
    }
}
