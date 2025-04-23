import * as z from "zod";

export const schema = z.object({
  firstName: z.string().min(2, {message: "Please enter your first name"}),
  lastName: z.string().min(2, {message: "Please enter your last name"}),
  gamerTag: z.string().regex(/^(?=.*\d).*$/, {message: "Username must include at least one number"}),
  email: z.string().email({message: "Please enter a valid email"}),
  password: z.string().min(4, {message: "Password must be at least 4 characters long"}),
});

export type RegisterData = z.infer<typeof schema>;