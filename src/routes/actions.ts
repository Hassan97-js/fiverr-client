import { redirect, type ActionFunctionArgs } from "react-router-dom";

import { GigSchema } from "../constants/gig-validator";
import {
  auth,
  handleError,
  makeApiRequest,
  retrieveData,
  storeData
} from "../utils";

import { type TCreateGig } from "../constants/form/create-gig-validator";

export const deleteGigAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(
        `[deleteGigAction] Something went wrong when trying to retrieve token`
      );
    }

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { gigId } = formEntries;

    const response = await makeApiRequest({
      method: "delete",
      url: `gigs/single/${gigId}`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    return error;
  }
};

export const createGigAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(
        `[createGigAction] Something went wrong when trying to retrieve token`
      );
    }

    const formData = await request.formData();
    const gig = Object.fromEntries(formData.entries()) as unknown as TCreateGig;

    // eslint-disable-next-line no-unused-vars
    // const { agreed, features, images, ...otherEntries } = gig;

    const { agreed, features, ...otherEntries } = gig;

    const featuresArray = features
      .trim()
      .toLowerCase()
      .split(",")
      .map((feature) => feature.trim());

    // const parsedImages = JSON.parse(images);
    // const data = { featuresArray, images: parsedImages, ...otherEntries };

    const data = { featuresArray, ...otherEntries };

    const response = await makeApiRequest({
      method: "post",
      url: "gigs/single",
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    const gigValidationResult = GigSchema.parse(response.data.gig);

    return redirect(`/gig/${gigValidationResult._id}`);
  } catch (error) {
    return handleError(error);
  }
};

export const createConversationAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(
        `[createConversationAction] Something went wrong when trying to retrieve token`
      );
    }

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { sellerId, buyerId, isSeller: isCurrentSeller } = formEntries;

    const fetchId = String(sellerId) + String(buyerId);
    const isSeller = !!isCurrentSeller;

    const response = await makeApiRequest({
      url: `conversations/single/${fetchId}`,
      headers: {
        Authorization: `Bearer ${currentToken}`
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
          Authorization: `Bearer ${currentToken}`
        }
      });

      return redirect(`/message/${response.data.fetchId}`);
    }

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return redirect(`/message/${response.data.fetchId}`);
  } catch (error) {
    return error;
  }
};

export const createMessageAction = async ({
  request,
  params
}: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(
        `[createMessageAction] Something went wrong when trying to retrieve token`
      );
    }

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
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    return error;
  }
};

export const isMessageReadAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(
        `[isMessageReadAction] Something went wrong when trying to retrieve token`
      );
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const response = await makeApiRequest({
      method: "put",
      url: `conversations/single`,
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    return error;
  }
};

export const addReviewAction = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(
        `[addReviewAction] Something went wrong when trying to retrieve token`
      );
    }

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const data = {
      description: formEntries.description,
      starNumber: formEntries.starNumber,
      gigId: params.id
    };

    const response = await makeApiRequest({
      method: "post",
      url: "reviews/single",
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    return null;
  } catch (error) {
    return error;
  }
};

export const signInAction = async ({ request }: ActionFunctionArgs) => {
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
      url: "auth/sign-in",
      data
    });

    if (response.status > 399 && response.status < 600) {
      throw response.data.message;
    }

    storeData("token", response.data.token);
    storeData("user", response.data.user);

    return redirect(redirectTo ? redirectTo : "/");
  } catch (error) {
    return error;
  }
};

export const signUpAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    if (!data?.isSeller) {
      data.isSeller = "false";
    } else if (data?.isSeller === "on") {
      data.isSeller = "true";
    }

    const response = await makeApiRequest({
      method: "post",
      url: "auth/sign-up",
      data
    });

    if (response.status > 399 && response.status < 600) {
      throw response.data;
    }

    return redirect("/sign-in");
  } catch (error) {
    return error;
  }
};
