import { useAsyncValue } from "react-router-dom";

import {
  FromApiChatsSchema,
  type TChat,
  type TFromApiChats
} from "../constants/chat-validator";

import { handleError } from "../utils";

import type { TAxiosResponse } from "../types/api.types";

export const useChats = (): TChat[] | null => {
  const chatsResponse = useAsyncValue() as TAxiosResponse<TFromApiChats>;

  let chatsData: TFromApiChats | null = null;

  const validationResult = FromApiChatsSchema.safeParse(chatsResponse.data);

  if (validationResult.success) {
    chatsData = validationResult.data;
  } else {
    handleError(validationResult.error);
    return null;
  }

  return chatsData?.chats;
};
