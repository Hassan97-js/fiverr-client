import { makeApiRequest } from "./api-request";
import { retrieveData } from "./local-storage";

import { FromApiUserSchema } from "../constants/validators/user-validator";

export const getCurrentUser = async () => {
  try {
    const token = retrieveData("token");

    if (!token) {
      return null;
    }

    const response = await makeApiRequest({
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
    console.log("Failed to get current user");
    return null;
  }
};
