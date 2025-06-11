import { Address } from "@/models/Address";
import { z } from "zod";

export class AddressValidator {
    private static schema = z.object({
        street: z.string().min(3, "La calle debe tener al menos 3 caracteres."),
        number: z.string().min(1, "El número es obligatorio."),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        user_id: z.number().optional(),
    });

    static validateField<K extends keyof Address>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
