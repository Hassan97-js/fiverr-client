import { z } from "zod";

export const PaymentPromiseSchema = z
  .object({
    paymentPromise: z.promise(z.unknown())
  })
  .strict();

export type TPaymentPromise = z.infer<typeof PaymentPromiseSchema>;
