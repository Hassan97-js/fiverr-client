import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";
import { OptionalGigSchema } from "./gig-validator";

/* __v: 0
_id: "659ab5d7ac3dd86dd0c71a0a"
buyerId: Object { _id: "6507109b3d8ba35a119d9881", username: "john", email: "john@dev.com", … }
createdAt: "2024-01-07T14:31:51.986Z"
gigId: Object { _id: "648613c63289c603d276d5f4", title: "Gig 3 title", price: 120, … }
isCompleted: true
payment_intent: "pi_3OVxOFHL68wNsu66094roPbD"
sellerId: Object { _id: "64f047f18c16564c45d6ad5c", username: "tarik", email: "tarik@dev.com", … }
updatedAt: "2024-01-07T14:32:17.597Z" */

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
