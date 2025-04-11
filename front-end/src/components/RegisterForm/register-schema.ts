import * as z from "zod";

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterData = z.infer<typeof schema>;