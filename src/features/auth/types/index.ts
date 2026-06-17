
export interface User {
    id: number;
    name: string;
    email: string;
    is_vip: number;
    vip_expires_at: string | number | null;
    email_verified_at: number | null;
    avatar?: string;
    role?: string;
}