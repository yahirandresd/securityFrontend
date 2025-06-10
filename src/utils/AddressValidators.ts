import { Address } from "@/models/Address";
import { z } from "zod";

export class AddressValidator {
    private static schema = z.object({
        street: z.string().min(3, "La calle debe tener al menos 3 caracteres."),
        number: z.string().min(1, "El número es obligatorio."),
        latitude: z.number().min(2, "La ciudad debe tener al menos 2 caracteres."),
        longitude: z.number().min(2, "El estado debe tener al menos 2 caracteres."),
    });

    static validateField<K extends keyof Address>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
