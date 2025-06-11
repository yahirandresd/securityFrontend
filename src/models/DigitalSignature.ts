// models/DigitalSignature.ts

export interface DigitalSignature {
  id?: number;
  photo?: File; // Siempre string (URL/ruta) cuando viene del backend
  user_id?: number;
}

