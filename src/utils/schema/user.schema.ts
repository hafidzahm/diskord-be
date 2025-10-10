import z from "zod";

const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
