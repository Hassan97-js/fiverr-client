import { type LoaderFunctionArgs, defer, redirect } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import {
  checkIfAuthenticated,
  getCurrentUser,
  makeApiRequest,
  retrieveData
} from "../utils";

export const rootLoader = async () => {
  try {
    const user = await getCurrentUser();

    return { user };
  } catch (error) {
    throw error;
  }
};

export const signInLoader = async () => {
  const isAuthenticated = await checkIfAuthenticated();

  return isAuthenticated && redirect("/");
};

export const successLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await checkIfAuthenticated();

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
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[paymentLoader] Unauthorized");
  }

  // Todo: Property 'env' does not exist on type 'ImportMeta'
  const loadStripePromise = loadStripe(
    // import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY
    "pk_live_51NLn9mHL68wNsu66XDIsdmrz3EUmqbqryCnNNuCXGQQ7CxhT7s3FyrCqqkAkO7ywDbZmp4x4oLdtW1Mt7xmEioXH00GKhXxDdR"
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

export const fetchMessagesLoader = async ({
  request,
  params
}: LoaderFunctionArgs) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchMessagesLoader] Unauthorized");
  }

  const messagesPromise = makeApiRequest({
    method: "get",
    url: `messages/${params.id}`,
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ messagesPromise });
};

export const addGigLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const isAuthenticated = await checkIfAuthenticated();

    const redirectTo = new URL(request.url).pathname;

    if (!isAuthenticated) {
      throw redirect(`/sign-in?redirectTo=${redirectTo}`);
    }

    const currentToken = retrieveData("token");

    if (!currentToken) {
      throw Error("[addGigLoader] Unauthorized");
    }
  } catch (error) {
    throw error;
  }
};

export const fetchConversationsLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchConversationsLoader] Unauthorized");
  }

  const conversationsPromise = makeApiRequest({
    method: "get",
    url: "conversations",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ conversationsPromise });
};

export const fetchOrdersLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchOrdersLoader] Unauthorized");
  }

  const ordersPromise = makeApiRequest({
    method: "get",
    url: "orders",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ ordersPromise });
};

export const fetchMyGigsLoader = async ({ request }: LoaderFunctionArgs) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  if (!currentToken) {
    throw Error("[fetchMyGigsLoader] Unauthorized");
  }

  const myGigsPromise = makeApiRequest({
    method: "get",
    url: "gigs/my",
    headers: {
      Authorization: `Bearer ${currentToken}`
    }
  });

  return defer({ myGigsPromise });
};

export const fetchGigsLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // console.log(Object.fromEntries(searchParams.entries()));

  const gigsPromise = makeApiRequest({
    method: "get",
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
