import { getCurrentUser } from "./current-user";

export const checkIfAuthenticated = async () => {
  try {
    const currentUser = await getCurrentUser();

    return !!currentUser;
  } catch (error) {
    return error;
  }
};
