import { z } from "zod";

import {
  ExternalGigSchemaPromise,
  ExternalGigsSchemaPromise,
  FromApiGigSchema,
  FromApiGigsSchema,
  GigSchema
} from "../constants/gig-validator";

export type TFromApiGigs = z.infer<typeof FromApiGigsSchema>;
export type TFromApiGig = z.infer<typeof FromApiGigSchema>;
export type TGig = z.infer<typeof GigSchema>;
export type TExternalGigsPromise = z.infer<typeof ExternalGigsSchemaPromise>;
export type TExternalGigPromise = z.infer<typeof ExternalGigSchemaPromise>;
