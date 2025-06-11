export interface Devise {
    id: number;
    name: string;
    ip: string;
    operating_system: string;
    user_id: number; // Clave foránea hacia el usuario
}
