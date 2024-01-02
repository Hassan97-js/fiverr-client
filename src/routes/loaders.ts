import { type LoaderFunctionArgs, defer, redirect } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import {
  auth,
  getCurrentUser,
  makeApiRequest,
  removeData,
  retrieveData
} from "../utils";

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

  const { payment_intent: paymentIntent } = Object.fromEntries(
    new URLSearchParams(url.search)
  );

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

  const loadStripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY
  );

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

  const paymentPromise = Promise.all([loadStripePromise, paymentIntentPromise]);

  return defer({ paymentPromise });
};

export const fetchChatMessagesLoader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const isAuthenticated = await auth();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchChatMessagesLoader] Unauthorized");
  }

  const chatMessagesPromise = makeApiRequest({
    url: `chat-messages/${params.id}`,
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ chatMessagesPromise });
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

  const chatsPromise = makeApiRequest({
    url: "chats",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ chatsPromise });
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

  const ordersPromise = makeApiRequest({
    url: "orders",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ ordersPromise });
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

  const privateGigsPromise = makeApiRequest({
    url: "gigs/private",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ privateGigsPromise });
};

export const fetchGigsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // console.log(Object.fromEntries(searchParams.entries()));

  const gigsPromise = makeApiRequest({
    url: "gigs",
    params: searchParams
  });

  return defer({ gigsPromise });
};

export const fetchSingleGigLoader = ({ params }: LoaderFunctionArgs) => {
  const gigPromise = Promise.all([
    makeApiRequest({ url: `gigs/single/${params.id}` }),
    makeApiRequest({ url: `reviews/${params.id}` })
  ]);

  return defer({ gigPromise });
};
