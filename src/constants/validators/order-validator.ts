import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";
import { OptionalGigSchema } from "./gig-validator";

export const OrderSchema = z
  .object({
    _id: ObjectIdSchema,
    gigId: z.union([OptionalGigSchema, ObjectIdSchema]),
    sellerId: z.union([UserSchema, ObjectIdSchema]),
    buyerId: z.union([UserSchema, ObjectIdSchema]),
    isCompleted: z.boolean().optional(),
    // Todo: Maybe validate the payment_intent string
    payment_intent: z.string().trim(),
    __v: z.number().optional(),
    createdAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    }),
    updatedAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    })
  })
  .strict();

export const FromApiOrdersSchema = z
  .object({
    success: z.boolean(),
    orders: z.array(OrderSchema)
  })
  .strict();

export const OrdersPromiseSchema = z
  .object({
    ordersPromise: z.promise(z.unknown())
  })
  .strict();

export type TOrder = z.infer<typeof OrderSchema>;
export type TFromApiOrders = z.infer<typeof FromApiOrdersSchema>;
export type TOrdersPromise = z.infer<typeof OrdersPromiseSchema>;
