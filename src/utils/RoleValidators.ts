import { Role } from "@/models/Role";
import { z } from "zod";

export class RoleValidator {
    private static schema = z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
        descripcion: z.string().min(6, "Descripción debe tener al menos 6 caracteres."),
    });

    static validateField<K extends keyof Role>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
