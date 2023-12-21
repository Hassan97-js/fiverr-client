import { makeApiRequest } from "./api-request";
import { removeData, retrieveData } from "./session-storage";

export const getCurrentUser = async () => {
  try {
    const currentToken = retrieveData("token");

    if (!currentToken) {
      return null;
    }

    const response = await makeApiRequest({
      method: "get",
      url: "user/current",
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (response.status === 401) {
      removeData("token");

      return null;
    }

    if (!response.data) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get current user");
  }
};
