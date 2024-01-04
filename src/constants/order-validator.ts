import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";
import { GigSchema } from "./gig-validator";

/* __v: 0
_id: "6596deadf8f38eca7d287357"
buyerId: Object { _id: "6507109b3d8ba35a119d9881", username: "john", email: "john@dev.com", … }
createdAt: "2024-01-04T16:37:01.746Z"
gigId: Object { _id: "648613c63289c603d276d5f4", title: "Gig 3 title", price: 120, … }
isCompleted: true
payment_intent: "pi_3OUtujHL68wNsu661wsdqJ5n"
sellerId: Object { _id: "64f047f18c16564c45d6ad5c", username: "tarik", email: "tarik@dev.com", … }
updatedAt: "2024-01-04T16:37:14.453Z" */

export const OrderSchema = z
  .object({
    _id: ObjectIdSchema,
    gigId: z.union([GigSchema, ObjectIdSchema]),
    sellerId: z.union([UserSchema, ObjectIdSchema]),
    buyerId: z.union([UserSchema, ObjectIdSchema]),
    isCompleted: z.boolean().optional(),
    // Todo: Maybe validate the payment_intent string
    payment_intent: z.string().trim().toLowerCase(),
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
