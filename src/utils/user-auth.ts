import { getCurrentUser } from "./current-user";

export const auth = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return false;
    }

    return !!currentUser;
  } catch (error) {
    console.error(error);

    return false;
  }
};
