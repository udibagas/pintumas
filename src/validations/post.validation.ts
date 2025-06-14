import { z } from "zod";

export const schema = z.object({
  title: z.string().nonempty("Judul harus diisi"),
  content: z.string().nonempty("Konten harus diisi"),
  authorId: z.string().optional(),
  categoryId: z.number(),
  departmentId: z.number(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});
