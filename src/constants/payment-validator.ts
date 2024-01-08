import { type Stripe } from "@stripe/stripe-js";
import { z } from "zod";

import type { TAxiosResponse } from "../types/api.types";

export const StripePaymentIntentIdSchema = z.object({
  clientSecret: z.string().refine((id) => /^pi_\w+$/.test(id), {
    message: "Invalid Stripe Payment Intent ID format"
  })
});

export type TStripePaymentIntentId = z.infer<typeof StripePaymentIntentIdSchema>;
export type TPaymentData = [Stripe | null, TAxiosResponse<TStripePaymentIntentId>];
