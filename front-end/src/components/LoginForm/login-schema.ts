import * as z from "zod";

export const schema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginData = z.infer<typeof schema>;