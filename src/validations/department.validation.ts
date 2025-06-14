import { z } from "zod";

export const schema = z.object({
  name: z.string().nonempty("Nama harus diisi"),
  description: z.string().optional(),
});
