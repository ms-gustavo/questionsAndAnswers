import { z } from "zod";

export const QuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IDBQuestions = z.infer<typeof QuestionSchema>;
