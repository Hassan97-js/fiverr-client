import { z } from "zod";

import {
  GigPromiseSchema,
  GigsPromiseSchema,
  FromApiGigSchema,
  FromApiGigsSchema,
  GigSchema,
  PrivateGigsPromiseSchema
} from "../constants/gig-validator";

export type TFromApiGigs = z.infer<typeof FromApiGigsSchema>;
export type TFromApiGig = z.infer<typeof FromApiGigSchema>;
export type TGig = z.infer<typeof GigSchema>;
export type TGigsPromise = z.infer<typeof GigsPromiseSchema>;
export type TPrivateGigsPromise = z.infer<typeof PrivateGigsPromiseSchema>;
export type TGigPromise = z.infer<typeof GigPromiseSchema>;
