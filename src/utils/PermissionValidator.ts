import { Permission } from "@/models/Permission";
import { z } from "zod";

export class PermissionValidator {
    private static schema = z.object({
        url: z.string().min(6, "La url debe tener al menos 6 caracteres."),
        method: z.string().min(3, "El method debe tener al menos 3 caracteres."),
        entity: z.string().min(3, "El entity debe tener al menos 3 caracteres."),
    });

    static validateField<K extends keyof Permission>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}

