import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title cannot exceed 50 characters" }),
    content: z
      .string()
      .min(1, { message: "Content is required" })
      .max(500, { message: "Content cannot exceed 500 characters" }),
  });