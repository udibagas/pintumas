import { z } from "zod";

export const schema = z.object({
  name: z.string().nonempty("Judul harus diisi"),
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      return val.length >= 6 || "Password harus minimal 6 karakter";
    }, "Password harus minimal 6 karakter"),
  role: z.enum(["READER", "REPORTER", "EDITOR", "ADMIN"], {
    required_error: "Role harus diisi",
    invalid_type_error: "Role harus berupa salah satu dari ADMIN, EDITOR, USER",
  }),
  departmentId: z.number(),
});
