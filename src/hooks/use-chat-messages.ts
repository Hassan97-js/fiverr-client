import { useAsyncValue } from "react-router-dom";

import {
  TFromApiChatMessages,
  type TChatMessage,
  FromApiChatMessagesSchema
} from "../constants/chat-validator";

import { handleError } from "../utils";

import type { TAxiosResponse } from "../types/api.types";

export const useChatMessages = () => {
  const chatMessagesResponse =
    useAsyncValue() as TAxiosResponse<TFromApiChatMessages>;

  let chatMessagesData: TFromApiChatMessages | null = null;

  const validationResult = FromApiChatMessagesSchema.safeParse(
    chatMessagesResponse.data
  );

  if (validationResult.success) {
    chatMessagesData = validationResult.data;
  } else {
    handleError(validationResult.error);
    return null;
  }

  return chatMessagesData?.chatMessages;
};
