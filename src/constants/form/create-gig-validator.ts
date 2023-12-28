import { z } from "zod";

export const CreateGigSchema = z.object({
  agreed: z.coerce.boolean(),
  category: z.string().trim().toLowerCase().max(30, {
    message: "Category should not be more than 10 characters"
  }),
  deliveryTime: z.coerce.number().positive().int(),
  description: z.string().trim().toLowerCase().max(150, {
    message: "Description should not be more than 100 characters"
  }),
  features: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^(\w+(\s*,\s*\w+)*)$/)
    .max(80, {
      message:
        "Features should not be more than 80 characters and should be a string with words separated by a comma followed by a space"
    }),
  price: z.coerce.number().positive().int(),
  revisionNumber: z.coerce.number().positive().int(),
  shortDescription: z.string().trim().toLowerCase().max(80, {
    message: "Short Description should not be more than 80 characters"
  }),
  shortTitle: z.string().trim().toLowerCase().max(45, {
    message: "Short Title should not be more than 45 characters"
  }),
  title: z.string().trim().toLowerCase().max(25, {
    message: "Title should not be more than 25 characters"
  })
});
