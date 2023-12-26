import { getCurrentUser } from "./current-user";

export const auth = async () => {
  try {
    const currentUser = await getCurrentUser();

    return !!currentUser;
  } catch (error) {
    console.log(error);

    return false;
  }
};