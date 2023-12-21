import { defer, redirect } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import {
  checkIfAuthenticated,
  getCurrentUser,
  makeApiRequest,
  retrieveData
} from "../utils";

export const rootLoader = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    return { currentUser };
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const successLoader = async ({ request }) => {
  const isAuthenticated = await checkIfAuthenticated();

  if (!isAuthenticated) {
    throw redirect("/sign-in?redirectTo=/gigs");
  }

  const currentToken = retrieveData("token");

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
        Authorization: `Bearer ${currentToken.accessToken}`
      }
    });

    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const paymentLoader = async ({ params, request }) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

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
      Authorization: `Bearer ${currentToken.accessToken}`
    }
  });

  const paymentPromise = Promise.all([loadStripePromise, paymentIntentPromise]);

  return defer({ paymentPromise });
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchMessagesLoader = async ({ request, params }) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  const messagesPromise = makeApiRequest({
    method: "get",
    url: `messages/${params.id}`,
    headers: {
      Authorization: `Bearer ${currentToken.accessToken}`
    }
  });

  return defer({ messagesPromise });
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchConversationsLoader = async ({ request }) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  const conversationsPromise = makeApiRequest({
    method: "get",
    url: "conversations",
    headers: {
      Authorization: `Bearer ${currentToken.accessToken}`
    }
  });

  return defer({ conversationsPromise });
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchOrdersLoader = async ({ request }) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  const ordersPromise = makeApiRequest({
    method: "get",
    url: "orders",
    headers: {
      Authorization: `Bearer ${currentToken.accessToken}`
    }
  });

  return defer({ ordersPromise });
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs}
 */
export const fetchMyGigsLoader = async ({ request }) => {
  const isAuthenticated = await checkIfAuthenticated();

  const redirectTo = new URL(request.url).pathname;

  if (!isAuthenticated) {
    throw redirect(`/sign-in?redirectTo=${redirectTo}`);
  }

  const currentToken = retrieveData("token");

  const myGigsPromise = makeApiRequest({
    method: "get",
    url: "gigs/my",
    headers: {
      Authorization: `Bearer ${currentToken.accessToken}`
    }
  });

  return defer({ myGigsPromise });
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchGigsLoader = async ({ request }) => {
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

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchSingleGigLoader = ({ params }) => {
  const gigsDataPromise = Promise.all([
    makeApiRequest({ method: "get", url: `gigs/single/${params.id}` }),
    makeApiRequest({ method: "get", url: `reviews/${params.id}` })
  ]);

  return defer({ gigsDataPromise });
};

export const signInLoader = async () => {
  const isAuthenticated = await checkIfAuthenticated();

  return isAuthenticated && redirect("/");
};
