import { useOutletContext } from "react-router-dom";

export const useUserContext = () => {
  const context = useOutletContext();

  if (!context) {
    throw new Error("useOutletContext must be used within a RouterProvider");
  }

  return context;
};
