import { redirect } from "react-router-dom";
import {
  checkIfAuthenticated,
  makeApiRequest,
  retrieveData,
  storeData
} from "../utils";

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const deleteGigAction = async ({ request }) => {
  try {
    const isAuthenticated = await checkIfAuthenticated();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { gigId } = formEntries;

    const response = await makeApiRequest({
      method: "delete",
      url: `gigs/single/${gigId}`,
      headers: {
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const createGigAction = async ({ request }) => {
  try {
    const isAuthenticated = await checkIfAuthenticated();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    if (!formEntries?.agreed) {
      formEntries.agreed = false;
    } else if (formEntries?.agreed === "on") {
      formEntries.agreed = true;
    }

    if (!formEntries.agreed) {
      throw Error("You have to agree to our terms and condtion");
    }

    // eslint-disable-next-line no-unused-vars
    const { agreed, features, images, ...otherEntries } = formEntries;

    const featuresArray = features
      .trim()
      .split(",")
      .map((feature) => feature.trim());

    const parsedImages = JSON.parse(images);

    const data = { featuresArray, images: parsedImages, ...otherEntries };

    const response = await makeApiRequest({
      method: "post",
      url: "gigs/single",
      data,
      headers: {
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    const gigId = response.data._id;

    return redirect(`/gig/${gigId}`);
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const createConversationAction = async ({ request }) => {
  try {
    const isAuthenticated = await checkIfAuthenticated();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { sellerId, buyerId, isSeller: isCurrentSeller } = formEntries;

    const fetchId = sellerId + buyerId;
    const isSeller = !!isCurrentSeller;

    const response = await makeApiRequest({
      method: "get",
      url: `conversations/single/${fetchId}`,
      headers: {
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    if (response.status === 404) {
      const response = await makeApiRequest({
        method: "post",
        url: `conversations/single`,
        data: {
          messageToId: isSeller ? buyerId : sellerId
        },
        headers: {
          Authorization: `Bearer ${currentToken.accessToken}`
        }
      });

      return redirect(`/message/${response.data.fetchId}`);
    }

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return redirect(`/message/${response.data.fetchId}`);
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const createMessageAction = async ({ request, params }) => {
  try {
    const isAuthenticated = await checkIfAuthenticated();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const data = {
      conversationId: params.id,
      text: formEntries.text
    };

    const response = await makeApiRequest({
      method: "post",
      url: "messages/single",
      data,
      headers: {
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const isMessageReadAction = async ({ request }) => {
  try {
    const isAuthenticated = await checkIfAuthenticated();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const response = await makeApiRequest({
      method: "put",
      url: `conversations/single`,
      data,
      headers: {
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const addReviewAction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const data = {
      description: formEntries.description,
      starNumber: parseInt(formEntries.starNumber),
      gigId: params.id
    };

    const response = await makeApiRequest({
      method: "post",
      url: "reviews/single",
      data
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const signInAction = async ({ request }) => {
  try {
    const searchParams = new URLSearchParams(new URL(request.url).searchParams);

    const redirectTo = searchParams.get("redirectTo");

    const formData = await request.formData();

    const username = formData.get("username");
    const password = formData.get("password");

    const data = {
      username,
      password
    };

    const response = await makeApiRequest({
      method: "post",
      url: "auth/signin",
      data
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    storeData("token", response.data);

    return redirect(redirectTo ? redirectTo : "/");
  } catch (error) {
    return error;
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const signUpAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    if (!data?.isSeller) {
      data.isSeller = false;
    } else if (data?.isSeller === "on") {
      data.isSeller = true;
    }

    const response = await makeApiRequest({
      method: "post",
      url: "auth/signup",
      data
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return redirect("/signin");
  } catch (error) {
    return error;
  }
};
