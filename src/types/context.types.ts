import { z } from "zod";

import { ContextSchema } from "../constants/context-validator";

export type TContext = z.infer<typeof ContextSchema>;
