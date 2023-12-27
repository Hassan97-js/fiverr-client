import { z } from "zod";

import { CreateGigSchema } from "../../constants/form/create-gig-validator";

export type TCreateGig = z.infer<typeof CreateGigSchema>;
