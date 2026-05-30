import { z } from "zod";

export const baseBookSchema = z.object({
    title: z.string().min(3, 'Nama minimal 3 karakter.'),
    writer: z.string().min(3, 'Nama minimal 3 karakter.'),
    stock: z.coerce.number({ message: 'Stok harus berupa angka.' })
            .int('Stok harus berupa bilangan bulat.')
            .min(0, 'Stok tidak boleh kurang dari 0.')
});