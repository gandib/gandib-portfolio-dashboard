import { z } from "zod";

const blogValidationSchema = z.object({
  title: z.string({ required_error: "Title is required!" }).trim(),
  tag: z.string({ required_error: "Tag is required!" }).trim(),
});

export default blogValidationSchema;
