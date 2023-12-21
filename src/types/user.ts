import { z } from "zod";
import { loaderDataUserSchema, userSchema } from "../constants/user-validator";

export type TLoaderDataUser = z.infer<typeof loaderDataUserSchema>;
export type TUser = z.infer<typeof userSchema>;
