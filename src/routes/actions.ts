import { AxiosError } from "axios";
import { redirect, type ActionFunctionArgs } from "react-router-dom";

import { GigSchema } from "../constants/validators/gig-validator";
import { auth, handleError, makeApiRequest, retrieveData, storeData } from "../utils";

import { type TCreateGig } from "../constants/validators/form/create-gig-validator";

export const deleteGigAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(`[deleteGigAction] Something went wrong when trying to retrieve token`);
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
      throw Error(`[createGigAction] Something went wrong when trying to retrieve token`);
    }

    const formData = await request.formData();
    const gig = Object.fromEntries(formData.entries()) as unknown as TCreateGig;

    const { agreed, features, images, image, ...otherEntries } = gig;

    if (!image) {
      throw Error("Cover Image is required");
    }

    if (!images) {
      throw Error("Gig Images are required");
    }

    const featuresArray = features
      .trim()
      .toLowerCase()
      .split(",")
      .map((feature) => feature.trim());

    const parsedImages = JSON.parse(images) as string[];
    const data = { featuresArray, images: parsedImages, coverImage: image, ...otherEntries };

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

export const createChatAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(`[createChatAction] Something went wrong when trying to retrieve token`);
    }

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { sellerId, buyerId, isSeller: isCurrentSeller } = formEntries;

    const isSeller = isCurrentSeller === "true";
    const chatId = isSeller ? `${sellerId}-${buyerId}` : `${buyerId}-${sellerId}`;

    const response = await makeApiRequest({
      url: `chats/single/${chatId}`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      },
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 404;
      }
    });

    if (response.status === 404) {
      const response = await makeApiRequest({
        method: "post",
        url: `chats/single`,
        data: {
          receiverId: isSeller ? buyerId : sellerId
        },
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      });

      const redirectUrl = response.data.chat.chatId as string;

      if (!redirectUrl) {
        return null;
      }

      return redirect(`/chat-messages/${redirectUrl}`);
    }

    const redirectUrl = response.data.chat.chatId as string;

    if (!redirectUrl) {
      return null;
    }

    return redirect(`/chat-messages/${redirectUrl}`);
  } catch (error) {
    return error;
  }
};

export const createChatMessageAction = async ({ request, params }: ActionFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      return redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error(`[createChatMessageAction] Something went wrong when trying to retrieve token`);
    }

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const data = {
      chatId: params.id,
      text: formEntries.text
    };

    const response = await makeApiRequest({
      method: "post",
      url: "chat-messages/single",
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    return response.data;
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
      throw Error(`[isMessageReadAction] Something went wrong when trying to retrieve token`);
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const response = await makeApiRequest({
      method: "put",
      url: `chats/single`,
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (!response.data.success) {
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
      throw Error(`[addReviewAction] Something went wrong when trying to retrieve token`);
    }

    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const data = {
      description: formEntries.description,
      starNumber: formEntries.starNumber,
      gigId: params.id
    };

    await makeApiRequest({
      method: "post",
      url: "reviews/single",
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

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

    storeData("token", response.data.token);
    storeData("user", response.data.user);

    return redirect(redirectTo ? redirectTo : "/");
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }

    return "Internal Server Error";
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

    await makeApiRequest({
      method: "post",
      url: "auth/sign-up",
      data
    });

    return redirect("/sign-in");
  } catch (error) {
    return error;
  }
};
