import z from "zod";

export const createFreeGroupSchema = z.object({
  name: z.string().min(3),
  about: z.string(),
});

export const createPaidGroupSchema = createFreeGroupSchema.extend({
  price: z.string(),
  benefit: z.array(z.string()).min(1),
});

export const updateFreeGroupSchema = createFreeGroupSchema;

export type CreateGroupSchemaType = z.infer<typeof createFreeGroupSchema>;
export type CreatePaidGroupSchemaType = z.infer<typeof createPaidGroupSchema>;
export type UpdateFreeGroupSchemaType = CreateGroupSchemaType;
