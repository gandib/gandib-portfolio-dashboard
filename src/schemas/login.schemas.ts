import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email!"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at least 6 characters"),
});

export default loginValidationSchema;
