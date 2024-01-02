import { useLoaderData } from "react-router-dom";

import {
  GigPromiseSchema,
  GigsPromiseSchema,
  PrivateGigsPromiseSchema
} from "../constants/gig-validator";
import { OrdersPromiseSchema } from "../constants/order-validator";
import {
  ChatMessagesPromiseSchema,
  ChatsPromiseSchema
} from "../constants/chat-validator";
import { handleError } from "../utils";
import { PaymentPromiseSchema } from "../constants/payment-validator";

type TPromiseTypes =
  | "gigsPromise"
  | "gigPromise"
  | "privateGigsPromise"
  | "ordersPromise"
  | "chatsPromise"
  | "chatMessagesPromise"
  | "paymentPromise";

type TDeferredDataReturnValue = {
  [key in TPromiseTypes]?: Promise<unknown> | null;
};

type TUseDeferredDataReturn = TDeferredDataReturnValue | null;

type TProps = {
  promiseType: TPromiseTypes;
};

export const useDeferredData = ({ promiseType }: TProps): TUseDeferredDataReturn => {
  const data = useLoaderData();

  if (promiseType === "gigPromise") {
    const result = GigPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (promiseType === "gigsPromise") {
    const result = GigsPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (promiseType === "privateGigsPromise") {
    const result = PrivateGigsPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (promiseType === "ordersPromise") {
    const result = OrdersPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (promiseType === "chatsPromise") {
    const result = ChatsPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (promiseType === "chatMessagesPromise") {
    const result = ChatMessagesPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  if (promiseType === "paymentPromise") {
    const result = PaymentPromiseSchema.safeParse(data);

    if (result.success) {
      return result.data;
    } else {
      handleError(result.error);
      return null;
    }
  }

  return null;
};
