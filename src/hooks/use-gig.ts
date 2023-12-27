import { useAsyncValue } from "react-router-dom";

import { FromApiGigSchema } from "../constants/gig-validator";
import { FromApiReviewsSchema } from "../constants/review-validator";

import { handleError } from "../utils";

import type { TFromApiGig, TGig } from "../types/gig.types";
import type { TAxiosResponses } from "../types/api.types";
import type { TFromApiReviews, TReview } from "../types/review.types";

export type TUseGigReturn = {
  gig: TGig | null;
  reviews: TReview[] | null;
};

export const useGig = (): TUseGigReturn => {
  const data = useAsyncValue() as TAxiosResponses<TFromApiGig, TFromApiReviews>;

  const [gigResponse, reviewsResponse] = data;

  let gig: TGig | null = null;
  let reviews: TReview[] | null = null;

  const gigValidationResult = FromApiGigSchema.safeParse(gigResponse.data);
  const reviewValidationResult = FromApiReviewsSchema.safeParse(
    reviewsResponse.data
  );

  if (gigValidationResult.success) {
    gig = gigValidationResult.data.gig;
  } else {
    handleError(gigValidationResult.error.issues);
  }

  if (reviewValidationResult.success) {
    reviews = reviewValidationResult.data.reviews;
  } else {
    handleError(reviewValidationResult.error.issues);
  }

  return { gig, reviews };
};
