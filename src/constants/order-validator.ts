import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";
import { GigSchema } from "./gig-validator";

export const OrderSchema = z
  .object({
    _id: ObjectIdSchema,
    gigId: z.union([GigSchema, ObjectIdSchema]),
    sellerId: z.union([UserSchema, ObjectIdSchema]),
    buyerId: z.union([UserSchema, ObjectIdSchema]),
    isCompleted: z.boolean().optional(),
    // Todo: Maybe validate the payment_intent string
    payment_intent: z.string().trim().toLowerCase()
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
