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

type TPromiseTypes =
  | "gigsPromise"
  | "gigPromise"
  | "privateGigsPromise"
  | "ordersPromise"
  | "chatsPromise"
  | "chatMessagesPromise";

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
    const validationResult = GigPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    } else {
      handleError(validationResult.error);
      return null;
    }
  }

  if (promiseType === "gigsPromise") {
    const validationResult = GigsPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    } else {
      handleError(validationResult.error);
      return null;
    }
  }

  if (promiseType === "privateGigsPromise") {
    const validationResult = PrivateGigsPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    } else {
      handleError(validationResult.error);
      return null;
    }
  }

  if (promiseType === "ordersPromise") {
    const validationResult = OrdersPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    } else {
      handleError(validationResult.error);
      return null;
    }
  }

  if (promiseType === "chatsPromise") {
    const validationResult = ChatsPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    } else {
      handleError(validationResult.error);
      return null;
    }
  }

  if (promiseType === "chatMessagesPromise") {
    const validationResult = ChatMessagesPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    } else {
      handleError(validationResult.error);
      return null;
    }
  }

  return null;
};
