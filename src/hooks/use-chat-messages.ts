import { useAsyncValue } from "react-router-dom";

import {
  TFromApiChatMessages,
  type TChatMessage,
  FromApiChatMessagesSchema
} from "../constants/validators/chat-validator";

import { handleError } from "../utils";

import type { TAxiosResponse } from "../types/api.types";

export const useChatMessages = () => {
  const response = useAsyncValue() as TAxiosResponse<TFromApiChatMessages>;

  let messagesData: TFromApiChatMessages | null = null;

  const result = FromApiChatMessagesSchema.safeParse(response.data);

  if (result.success) {
    messagesData = result.data;
  } else {
    handleError(result.error);
    return null;
  }

  return messagesData?.chatMessages;
};
