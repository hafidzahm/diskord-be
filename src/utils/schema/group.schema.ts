import z from "zod";

const createFreeGroupSchema = z.object({
  name: z.string().min(3),
  about: z.string(),
});

export type CreateGroupSchemaType = z.infer<typeof createFreeGroupSchema>;
