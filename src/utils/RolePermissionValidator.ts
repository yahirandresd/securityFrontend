import { RolePermission } from "@/models/RolePermission";
import { z } from "zod";
export class RolePermissionValidator {
    private static schema = z.object({
        role_id: z.number(),
        permission_id: z.number()
    });

    static validateField<K extends keyof RolePermission>(field: K, value: any) {
        const fieldSchema = this.schema.pick({ [field]: true } as any);
        return fieldSchema.safeParse({ [field]: value });
    }
}
