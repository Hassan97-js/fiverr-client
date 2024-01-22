import { redirect, type ActionFunctionArgs } from "react-router-dom";

import { GigSchema } from "../constants/validators/gig-validator";
import { auth, getChatId, handleError, makeApiRequest, retrieveData, storeData } from "../utils";

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

    await makeApiRequest({
      method: "delete",
      url: `gigs/single/${gigId}`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    return null;
  } catch (error) {
    return handleError(error)?.message;
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
    return handleError(error)?.message;
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

    const { sellerId, buyerId } = formEntries;
    const isSeller = Boolean(formEntries.isSeller);

    const chatId = getChatId(isSeller, String(sellerId), String(buyerId));

    const response = await makeApiRequest({
      url: `chats/single/${chatId}`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      },
      validateStatus: (status) => {
        return (status >= 200 && status < 400) || status === 404;
      }
    });

    if (response.status === 404) {
      const response = await makeApiRequest({
        method: "post",
        url: "chats/single",
        data: {
          sellerId,
          buyerId,
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
    return handleError(error)?.message;
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
    return handleError(error)?.message;
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

    await makeApiRequest({
      method: "put",
      url: `chats/single`,
      data,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    return null;
  } catch (error) {
    return handleError(error)?.message;
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
      rating: formEntries.rating,
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
    return handleError(error)?.message;
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
    return handleError(error)?.message;
  }
};

export const signUpAction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    if (!data.image) {
      throw Error("Profile image is required");
    }

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
    return handleError(error)?.message;
  }
};
