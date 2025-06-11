// src/utils/DigitalSignatureValidator.ts
import { z } from 'zod';

// Esquema principal de validación para la firma digital
export const digitalSignatureSchema = z.object({
  photo: z
    .any()
    .refine((file) => file instanceof File, {
      message: 'Debe seleccionar un archivo válido.',
    }),
  user_id: z
    .number()
    .min(1, { message: 'Debe seleccionar un usuario.' }),
});

// Validador con funciones individuales
export const DigitalSignatureValidator = {
  /**
   * Valida un campo individual.
   * @param field Nombre del campo
   * @param value Valor del campo
   */
  validateField(field: keyof z.infer<typeof digitalSignatureSchema>, value: any) {
    const shape = { [field]: digitalSignatureSchema.shape[field] };
    const partialSchema = z.object(shape);
    return partialSchema.safeParse({ [field]: value });
  },

  /**
   * Valida todos los campos a la vez
   * @param data Objeto con todos los campos del formulario
   */
  validateAll(data: any) {
    return digitalSignatureSchema.safeParse(data);
  }
};
