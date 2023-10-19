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
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    if (response.status === 401) {
      removeData("token");

      return null;
    }

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
