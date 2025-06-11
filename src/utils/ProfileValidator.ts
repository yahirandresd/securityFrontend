import { Profile } from "@/models/Profile";
import { z } from "zod";

export class ProfileValidator {
    private static schema = z.object({
        user_id: z.number(),
        photo: z
            .any()
            .refine((file) => file instanceof File, {
                message: 'Debe seleccionar un archivo válido.',
            }),
        phone: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos.").optional(),

    });

    static validateField<K extends keyof Profile>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
