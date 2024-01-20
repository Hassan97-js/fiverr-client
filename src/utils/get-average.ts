import { type TReview } from "../constants/validators/review-validator";

export const getAverage = (numbers: number[]) => {
  if (numbers.length === 0) {
    return 0;
  }

  const sum = numbers?.reduce((acc, current) => (acc += current), 0);
  const avg = Math.round(sum / numbers?.length);

  return avg;
};

export const getRatingAverage = ({ reviewsArray }: { reviewsArray?: TReview[] }) => {
  if (!reviewsArray || reviewsArray.length === 0) {
    return 0;
  }

  const ratings = reviewsArray?.map((review) => review.rating);

  return getAverage(ratings);
};
