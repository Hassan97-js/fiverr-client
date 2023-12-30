import { useLoaderData } from "react-router-dom";

import {
  GigPromiseSchema,
  GigsPromiseSchema,
  PrivateGigsPromiseSchema
} from "../constants/gig-validator";
import { OrdersPromiseSchema } from "../constants/order-validator";

type TPromiseTypes =
  | "gigsPromise"
  | "gigPromise"
  | "privateGigsPromise"
  | "ordersPromise";

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
    const validatedGigPromise = GigPromiseSchema.safeParse(data);

    if (validatedGigPromise.success) {
      return validatedGigPromise.data;
    }

    return null;
  }

  if (promiseType === "gigsPromise") {
    const validationResult = GigsPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    }

    return null;
  }

  if (promiseType === "privateGigsPromise") {
    const validationResult = PrivateGigsPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    }

    return null;
  }

  if (promiseType === "ordersPromise") {
    const validationResult = OrdersPromiseSchema.safeParse(data);

    if (validationResult.success) {
      return validationResult.data;
    }

    return null;
  }

  return null;
};
