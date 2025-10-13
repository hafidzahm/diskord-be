import z from "zod";

export const createFreeGroupSchema = z.object({
  name: z.string().min(3),
  about: z.string(),
});

export const createPaidGroupSchema = createFreeGroupSchema.extend({
  price: z.string(),
  benefit: z.array(z.string()).min(1),
});

export type CreateGroupSchemaType = z.infer<typeof createFreeGroupSchema>;
export type CreatePaidGroupSchemaType = z.infer<typeof createPaidGroupSchema>;
