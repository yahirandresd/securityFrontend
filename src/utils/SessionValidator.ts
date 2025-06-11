import { Session } from "@/models/Session";
import { z } from "zod";

export class SessionValidator {
    private static schema = z.object({
        user_id: z.number(),
        FACode: z.string().min(6, "El FACode debe tener al menos 6 caracteres."),
        token: z.string().min(6, "El token debe tener al menos 6 caracteres."),
        state: z.string().optional(),
    });

    static validateField<K extends keyof Session>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}

