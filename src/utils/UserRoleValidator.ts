import { UserRole } from "@/models/UserRole";
import { z } from "zod";

export class UserRoleValidator {
    private static schema = z.object({
        user_id: z.number().min(1, "El nombre debe tener al menos 3 caracteres."),
        role_id: z.number().min(1, "Descripción debe tener al menos 6 caracteres."),
        startAt: z.preprocess(val => new Date(val as string), z.date()),
        endAt: z.preprocess(val => new Date(val as string), z.date()),
    });

    static validateField<K extends keyof UserRole>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
