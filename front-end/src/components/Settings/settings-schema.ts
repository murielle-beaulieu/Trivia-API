import * as z from "zod";

export const schema = z.object({
  difficulty: z.string(),
  category: z.string(),
});

export type GameSettingsData = z.infer<typeof schema>;