export const setIsActive = ({ isActive }: { isActive: boolean; isPending: boolean; isTransitioning: boolean }) => {
  return isActive ? "link underline" : "link";
};
