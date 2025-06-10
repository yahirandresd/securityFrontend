import { Password } from "@/models/Password";
import { z } from "zod";

export class PasswordValidator {
    private static schema = z.object({
        content: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
        startAd: z.date({
            required_error: "La fecha de inicio es obligatoria.",
        }),
        endAd: z.date({
            required_error: "La fecha de fin es obligatoria.",
        }),
    });

    static validateField<K extends keyof Password>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
