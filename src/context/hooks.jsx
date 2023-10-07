import { useContext } from "react";
import { UserContext } from "./user-context";

export const useCurrentUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useCloudinaryContext must be used within a CloudinaryProvider");
  }

  return context;
};
