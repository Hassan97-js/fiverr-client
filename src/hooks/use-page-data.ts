import { type Stripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";

import {
  FromApiGigSchema,
  FromApiGigsSchema,
  type TGig
} from "../constants/gig-validator";
import { FromApiOrdersSchema, TOrder } from "../constants/order-validator";
import {
  FromApiChatMessagesSchema,
  FromApiChatsSchema,
  type TChat,
  type TChatMessage
} from "../constants/chat-validator";
import {
  StripePaymentIntentIdSchema,
  type TPaymentData,
  type TStripePaymentIntentId
} from "../constants/payment-validator";
import { FromApiReviewsSchema, type TReview } from "../constants/review-validator";

import { handleError } from "../utils";

import { TAxiosResponses } from "../types/api.types";

type TPageTypes =
  | "gigs"
  | "gig"
  | "privateGigs"
  | "orders"
  | "chats"
  | "chatMessages"
  | "payment";

type PageData = {
  gigs?: TGig[];
  gig?: { data: TGig; reviews: TReview[] };
  privateGigs?: TGig[];
  orders?: TOrder[];
  chats?: TChat[];
  chatMessages?: TChatMessage[];
  payment?: {
    stripe: Stripe | PromiseLike<Stripe | null> | null;
    paymentIntent: TStripePaymentIntentId;
  };
} | null;

type TProps = {
  dataType: TPageTypes;
};

export const usePageData = ({ dataType }: TProps): PageData => {
  const data = useLoaderData();

  if (dataType === "gig") {
    const [gigsResponse, reviewsResponse] = data as TAxiosResponses<TGig, TReview[]>;

    const gigResult = FromApiGigSchema.safeParse(gigsResponse.data);
    const reivewResult = FromApiReviewsSchema.safeParse(reviewsResponse.data);

    if (gigResult.success && reivewResult.success) {
      return {
        gig: { data: gigResult.data.gig, reviews: reivewResult.data.reviews }
      };
    } else if (!gigResult.success && !reivewResult.success) {
      handleError(gigResult.error);
      handleError(reivewResult.error);
      return null;
    }
  }

  if (dataType === "gigs") {
    const result = FromApiGigsSchema.safeParse(data);

    if (result.success) {
      return { gigs: result.data.gigs };
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (dataType === "privateGigs") {
    const result = FromApiGigsSchema.safeParse(data);

    if (result.success) {
      return { privateGigs: result.data.gigs };
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (dataType === "orders") {
    const result = FromApiOrdersSchema.safeParse(data);

    if (result.success) {
      return { orders: result.data.orders };
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (dataType === "chats") {
    const result = FromApiChatsSchema.safeParse(data);

    if (result.success) {
      return { chats: result.data.chats };
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (dataType === "chatMessages") {
    const result = FromApiChatMessagesSchema.safeParse(data);

    if (result.success) {
      return { chatMessages: result.data.chatMessages };
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (dataType === "payment") {
    const [stripe, paymentIntent] = data as TPaymentData;

    const result = StripePaymentIntentIdSchema.safeParse(paymentIntent.data);

    if (result.success) {
      return {
        payment: {
          stripe,
          paymentIntent: result.data
        }
      };
    } else {
      handleError(result.error);
      return null;
    }
  }

  return null;
};