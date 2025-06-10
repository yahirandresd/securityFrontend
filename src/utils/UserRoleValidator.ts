import { UserRole } from "@/models/UserRole";
import { z } from "zod";

export class UserRoleValidator {
    private static schema = z.object({
        userId: z.number().min(1, "El nombre debe tener al menos 3 caracteres."),
        roleId: z.number().min(1, "Descripción debe tener al menos 6 caracteres."),
        startAd: z.date({
            required_error: "La fecha de inicio es obligatoria.",
        }),
        endAd: z.date({
            required_error: "La fecha de fin es obligatoria.",
        }),
    });

    static validateField<K extends keyof UserRole>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
