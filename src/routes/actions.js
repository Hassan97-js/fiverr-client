import { redirect, redirectDocument } from "react-router-dom";
import { makeApiRequest, storeData } from "../utils";

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const createGigAction = async ({ request }) => {
  try {
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
    const { agreed, features, gigImgs, ...otherEntries } = formEntries;

    const featuresArray = features
      .trim()
      .split(",")
      .map((feature) => feature.trim());

    const parsedGigImgs = JSON.parse(gigImgs);

    const data = { featuresArray, gigImgs: parsedGigImgs, ...otherEntries };

    const response = await makeApiRequest({
      method: "post",
      url: "gigs/single",
      data
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
export const deleteGigAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { gigId } = formEntries;

    const response = await makeApiRequest({
      method: "delete",
      url: `gigs/single/${gigId}`
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
export const createConversationAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const { sellerId, buyerId, isSeller: isCurrentSeller } = formEntries;

    const fetchId = sellerId + buyerId;
    const isSeller = !!isCurrentSeller;

    const response = await makeApiRequest({
      method: "get",
      url: `conversations/single/${fetchId}`,
      validateStatus: function (status) {
        return status === 404;
      }
    });

    if (response.status === 404) {
      const response = await makeApiRequest({
        method: "post",
        url: `conversations/single`,
        data: {
          messageToId: isSeller ? buyerId : sellerId
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
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const data = {
      conversationId: params.id,
      text: formEntries.text
    };

    const response = await makeApiRequest({
      method: "post",
      url: "messages/single",
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
export const isMessageReadAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    const response = await makeApiRequest({
      method: "put",
      url: `conversations/single`,
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
export const signinAction = async ({ request }) => {
  try {
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

    storeData("currentUser", response.data);

    return redirectDocument("/");
  } catch (error) {
    return error;
  }
};

/**
 * @param {import("react-router-dom").ActionFunctionArgs} request
 */
export const signupAction = async ({ request }) => {
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
