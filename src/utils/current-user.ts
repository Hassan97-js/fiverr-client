import { makeApiRequest } from "./api-request";
import { retrieveData } from "./local-storage";

import { FromApiUserSchema } from "../constants/user-validator";

export const getCurrentUser = async () => {
  try {
    const token = retrieveData("token");

    if (!token) {
      return null;
    }

    const response = await makeApiRequest({
      method: "get",
      url: "user/current",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const validationResult = FromApiUserSchema.parse(response.data);

    if (!validationResult.success) {
      return null;
    }

    return validationResult.user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current user");
  }
};
