import { z } from "zod";

import {
  fromApiUserSchema,
  loaderDataUserSchema,
  userSchema
} from "../constants/user-validator";

export type TLoaderDataUser = z.infer<typeof loaderDataUserSchema>;
export type TFromApiUser = z.infer<typeof fromApiUserSchema>;
export type TUser = z.infer<typeof userSchema>;
