import { defer, redirect } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { makeApiRequest, removeData, retrieveData } from "../utils";

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const successLoader = async ({ request }) => {
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
      }
    });
  } catch (error) {
    throw Error(error);
  }

  return null;
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const paymentLoader = ({ params }) => {
  const loadStripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_TEST_PUBLISHABLE_KEY
  );

  const paymentIntentPromise = makeApiRequest({
    method: "post",
    url: "payment/create-payment-intent",
    data: {
      gigId: params?.gigId
    }
  });

  const paymentPromise = Promise.all([loadStripePromise, paymentIntentPromise]);

  return defer({ paymentPromise });
};

export const fetchCurrentUserFromDB = async () => {
  try {
    const currentToken = retrieveData("token");

    console.log(currentToken);

    if (!currentToken) {
      return redirect("sign-in");
    }

    const response = await makeApiRequest({
      method: "get",
      url: `user/current`,
      headers: {
        Authorization: `Bearer ${currentToken}`
      }
    });

    if (response.status === 401) {
      removeData("token");
      return redirect("/signin");
    }

    if (response.status > 399 && response.status < 600) {
      throw Error(`Something went wrong: ${response.status}`);
    }

    // return response.data;

    return null;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchMessagesFromDB = ({ params }) => {
  const messagesPromise = makeApiRequest({
    method: "get",
    url: `messages/${params.id}`
  });

  return defer({ messagesPromise });
};

export const fetchConversationsFromDB = () => {
  const conversationsPromise = makeApiRequest({
    method: "get",
    url: "conversations"
  });

  return defer({ conversationsPromise });
};

export const fetchOrdersFromDB = () => {
  const ordersPromise = makeApiRequest({
    method: "get",
    url: "orders"
  });

  return defer({ ordersPromise });
};

export const fetchMyGigsFromDB = () => {
  const myGigsPromise = makeApiRequest({
    method: "get",
    url: "gigs/my"
  });

  return defer({ myGigsPromise });
};

/**
 * @param {import("react-router-dom").LoaderFunctionArgs} request
 */
export const fetchGigsFromDB = ({ request }) => {
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
export const fetchSingleGigFromDB = ({ params }) => {
  const gigsDataPromise = Promise.all([
    makeApiRequest({ method: "get", url: `gigs/single/${params.id}` }),
    makeApiRequest({ method: "get", url: `reviews/${params.id}` })
  ]);

  return defer({ gigsDataPromise });
};
