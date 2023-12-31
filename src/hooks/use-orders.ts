import { useAsyncValue } from "react-router-dom";

import {
  FromApiOrdersSchema,
  type TFromApiOrders,
  type TOrder
} from "../constants/order-validator";

import { handleError } from "../utils";

import type { TAxiosResponse } from "../types/api.types";

export const useOrders = (): TOrder[] | null => {
  const ordersResponse = useAsyncValue() as TAxiosResponse<TFromApiOrders>;

  let ordersData: TFromApiOrders | null = null;

  const validationResult = FromApiOrdersSchema.safeParse(ordersResponse.data);

  if (validationResult.success) {
    ordersData = validationResult.data;
  } else {
    handleError(validationResult.error);
    return null;
  }

  return ordersData?.orders;
};
