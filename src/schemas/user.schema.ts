import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string().trim().optional(),
  image: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at least 6 characters")
    .optional(),
});

export default userValidationSchema;
