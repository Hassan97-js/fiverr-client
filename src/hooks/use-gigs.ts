import { useAsyncValue } from "react-router-dom";

import { FromApiGigsSchema, type TFromApiGigs, type TGig } from "../constants/validators/gig-validator";

import { handleError } from "../utils";

import type { TAxiosResponse } from "../types/api.types";

export const useGigs = (): TGig[] | null => {
  const gigsResponse = useAsyncValue() as TAxiosResponse<TFromApiGigs>;

  let gigsData: TFromApiGigs | null = null;

  const validationResult = FromApiGigsSchema.safeParse(gigsResponse.data);

  if (validationResult.success) {
    gigsData = validationResult.data;
  } else {
    handleError(validationResult.error);
    return null;
  }

  return gigsData?.gigs;
};
