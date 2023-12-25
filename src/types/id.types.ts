import { z } from "zod";

import { ObjectIdSchema } from "../constants/id-validator";

export type TObjectId = z.infer<typeof ObjectIdSchema>;
