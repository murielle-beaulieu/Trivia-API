import * as z from "zod";

export const schema = z.object({
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string(),
});

export type LoginData = z.infer<typeof schema>;