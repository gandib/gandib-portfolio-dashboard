import { z } from "zod";

const recoverPasswordValidationSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(6, "Password needs to be at least 6 characters"),
});

export default recoverPasswordValidationSchema;
