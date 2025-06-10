import { Profile } from "@/models/Profile";
import { z } from "zod";

export class ProfileValidator {
    private static schema = z.object({
        photo: z.string(),
        phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos.").optional(),
        
    });

    static validateField<K extends keyof Profile>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
