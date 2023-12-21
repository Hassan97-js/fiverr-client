export const getRatingAverage = (totalStars = 0, starNumber = 0) => {
  if (totalStars === 0 || starNumber === 0) {
    return 0;
  }

  return Math.round(totalStars / starNumber);
};
