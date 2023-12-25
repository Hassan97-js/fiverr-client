import { z } from "zod";

import {
  FromApiUserSchema,
  ExternalUserSchema,
  UserSchema
} from "../constants/user-validator";

export type TExternalUser = z.infer<typeof ExternalUserSchema>;
export type TFromApiUser = z.infer<typeof FromApiUserSchema>;
export type TUser = z.infer<typeof UserSchema>;
