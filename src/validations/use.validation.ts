import { email, z } from "zod";

export const baseUserSchema = z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter.'),
    email: z.string().email('Format email tidak valid.')
});