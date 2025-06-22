import { z } from "zod";

export const schema = z.object({
  name: z.string().nonempty("Nama harus diisi"),
  description: z.string().optional(),
  link: z.string().url("Link harus berupa URL yang valid").optional(),
  mediaId: z.number().int("ID media harus berupa angka").optional(),
});
