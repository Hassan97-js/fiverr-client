import { useOutletContext } from "react-router-dom";
import { ContextSchema } from "../constants/context-validator";
import { handleError } from "../utils";

import { type TUser } from "../constants/user-validator";

export const useUser = () => {
  const contextData = useOutletContext();

  let user: TUser | null = null;

  const userValidationResult = ContextSchema.safeParse(contextData);

  if (userValidationResult.success) {
    user = userValidationResult.data.user;
  } else {
    handleError(userValidationResult.error);
    return null;
  }

  return user;
};
