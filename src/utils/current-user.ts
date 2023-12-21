import { makeApiRequest } from "./api-request";
import { retrieveData } from "./local-storage";

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

    if (!response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current user");
  }
};
