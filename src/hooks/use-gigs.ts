import { useAsyncValue } from "react-router-dom";

import { FromApiGigsSchema } from "../constants/gig-validator";

import { handleError } from "../utils";

import type { TFromApiGigs, TGig } from "../types/gig.types";
import type { TAxiosResponse } from "../types/api.types";

export const useGigs = (): TGig[] | null => {
  const gigsResponse = useAsyncValue() as TAxiosResponse<TFromApiGigs>;

  let gigsData: TFromApiGigs | null = null;

  const validationResult = FromApiGigsSchema.safeParse(gigsResponse.data);

  if (validationResult.success) {
    gigsData = validationResult.data;
  } else {
    handleError(validationResult.error.issues);
    return null;
  }

  return gigsData?.gigs;
};
