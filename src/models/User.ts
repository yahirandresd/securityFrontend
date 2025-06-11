import { Address } from './Address';

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    age?: number;
    address?: Address;
    city?: string;
    phone?: string;
    is_active?: boolean;
    token?: string;
}
