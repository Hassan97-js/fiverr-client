import { z } from "zod";

import {
  deferredApiGigSchema,
  fromApiGigSchema,
  gigSchema
} from "../constants/gig-validator";

export type TFromApiGig = z.infer<typeof fromApiGigSchema>;
export type TGig = z.infer<typeof gigSchema>;
export type TDeferredGigPromise = z.infer<typeof deferredApiGigSchema>;
