// import { z } from "zod";

// export const CreateGigSchema = z.object({
//   agreed: z.coerce.boolean(),
//   category: z.string().trim().toLowerCase().max(30, {
//     message: "Category should not be more than 10 characters"
//   }),
//   deliveryTime: z.coerce.number().positive().int(),
//   description: z.string().trim().toLowerCase().max(150, {
//     message: "Description should not be more than 100 characters"
//   }),
//   features: z
//     .string()
//     .trim()
//     .toLowerCase()
//     // match a string with list of items separated by commas.
//     .regex(/^\s*[a-zA-Z0-9\s]+\s*(,\s*[a-zA-Z0-9\s]+\s*)*(,\s*[a-zA-Z0-9]+\s*)?\s*$/)
//     .max(80, {
//       message:
//         "Features should not be more than 80 characters and should be a string with words separated by a comma followed by a space"
//     }),
//   price: z.coerce.number().positive().int(),
//   revisionNumber: z.coerce.number().positive().int(),
//   shortDescription: z.string().trim().toLowerCase().max(80, {
//     message: "Short Description should not be more than 80 characters"
//   }),
//   shortTitle: z.string().trim().toLowerCase().max(45, {
//     message: "Short Title should not be more than 45 characters"
//   }),
//   title: z.string().trim().toLowerCase().max(25, {
//     message: "Title should not be more than 25 characters"
//   })
// });

// export type TCreateGig = z.infer<typeof CreateGigSchema>;

export type TCreateGig = {
  agreed: boolean;
  category: string;
  deliveryTime: number;
  description: string;
  images: string;
  image: string;
  features: string;
  price: number;
  revisionNumber: number;
  shortDescription: string;
  shortTitle: string;
  title: string;
};
