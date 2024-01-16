import { z } from "zod";

import { UserSchema } from "./user-validator";

export const ContextSchema = z.object({
  user: UserSchema
});
