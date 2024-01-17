import { type LoaderFunctionArgs, redirect } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { auth, getCurrentUser, makeApiRequest, removeData, retrieveData } from "../utils";

export const rootLoader = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      removeData("token");
      removeData("user");
    }

    return { user };
  } catch (error) {
    return error;
  }
};

export const signInLoader = async () => {
  const currentToken = retrieveData("token");

  return currentToken && redirect("/");
};

export const successLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  if (!isAuthenticated) {
    throw redirect("/sign-in?redirectTo=/gigs");
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[successLoader] Unauthorized");
  }

  const url = new URL(request.url);

  const { payment_intent: paymentIntent } = Object.fromEntries(new URLSearchParams(url.search));

  try {
    await makeApiRequest({
      method: "put",
      url: "orders/single",
      data: {
        paymentIntent
      },
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    return null;
  } catch (error) {
    throw error;
  }
};

export const paymentLoader = async ({ params, request }: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[paymentLoader] Unauthorized");
  }

  const loadStripePromise = loadStripe(import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY);

  const paymentIntentPromise = makeApiRequest({
    method: "post",
    url: "payment/create-payment-intent",
    data: {
      gigId: params?.gigId
    },
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  const paymentResponses = await Promise.all([loadStripePromise, paymentIntentPromise]);

  return paymentResponses;
};

export const fetchChatMessagesLoader = async ({ request, params }: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchChatMessagesLoader] Unauthorized");
  }

  const chatMessagesResponse = await makeApiRequest({
    url: `chat-messages/${params.id}`,
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return chatMessagesResponse.data;
};

export const addGigLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const isAuthenticated = await auth();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      throw redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error("[addGigLoader] Unauthorized");
    }

    return null;
  } catch (error) {
    return error;
  }
};

export const fetchChatsLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchChatsLoader] Unauthorized");
  }

  const chatsResponse = await makeApiRequest({
    url: "chats",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return chatsResponse.data;
};

export const fetchOrdersLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchOrdersLoader] Unauthorized");
  }

  const response = await makeApiRequest({
    url: "orders",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return response.data;
};

export const fetchPrivateGigsLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchPrivateGigsLoader] Unauthorized");
  }

  const privateGigsResponse = await makeApiRequest({
    url: "gigs/private",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return privateGigsResponse.data;
};

export const fetchGigsLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const gigsResponse = await makeApiRequest({
      url: "gigs",
      params: searchParams
    });

    return gigsResponse.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchSingleGigLoader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const gigsResponse = await Promise.all([
      makeApiRequest({ url: `gigs/single/${params.id}` }),
      makeApiRequest({ url: `reviews/${params.id}` })
    ]);

    return gigsResponse;
  } catch (error) {
    console.log(error);
    return error;
  }
};
