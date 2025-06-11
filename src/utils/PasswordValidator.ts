import { Password } from "@/models/Password";
import { z } from "zod";

export class PasswordValidator {
    private static schema = z.object({
        content: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
        startAt: z.preprocess(val => new Date(val as string), z.date()),
        endAt: z.preprocess(val => new Date(val as string), z.date()),
        user_id: z.number().int().optional(),
    });

    static validateField<K extends keyof Password>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
