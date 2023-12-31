import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";

export const ChatSchema = z
  .object({
    _id: ObjectIdSchema,
    fetchId: z.string().trim().toLowerCase().max(48, {
      message: "Chat id must be 48 characters long"
    }),
    sellerId: z.union([UserSchema, ObjectIdSchema]),
    buyerId: z.union([UserSchema, ObjectIdSchema]),
    lastMessage: z
      .string()
      .trim()
      .toLowerCase()
      .max(400, {
        message: "A chat message must be max 400 characters long"
      })
      .optional(),
    readBySeller: z.boolean(),
    readByBuyer: z.boolean(),
    createdAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    }),
    updatedAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    }),
    __v: z.number().optional()
  })
  .strict();

export const FromApiChatsSchema = z
  .object({
    success: z.boolean(),
    chats: z.array(ChatSchema)
  })
  .strict();

export const FromApiChatSchema = z
  .object({
    success: z.boolean(),
    chat: ChatSchema
  })
  .strict();

export const ChatsPromiseSchema = z
  .object({
    chatsPromise: z.promise(z.unknown())
  })
  .strict();

export const ChatMessageSchema = z
  .object({
    _id: ObjectIdSchema,
    chatId: z.string().trim().toLowerCase().max(48, {
      message: "Chat id must be 48 characters long"
    }),
    userId: z.union([UserSchema, ObjectIdSchema]),
    text: z.string().trim().toLowerCase().max(400, {
      message: "A chat message must be max 400 characters long"
    }),
    createdAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    }),
    updatedAt: z.coerce.date({
      required_error: "Please select a date and time",
      invalid_type_error: "That's not a date!"
    })
  })
  .strict();

export const FromApiChatMessagesSchema = z
  .object({
    success: z.boolean(),
    chatMessages: z.array(ChatMessageSchema)
  })
  .strict();

export const FromApiChatMessageSchema = z
  .object({
    success: z.boolean(),
    chatMessage: ChatMessageSchema
  })
  .strict();

export const ChatMessagesPromiseSchema = z
  .object({
    chatMessagesPromise: z.promise(z.unknown())
  })
  .strict();

export const ChatMessagePromiseSchema = z
  .object({
    chatMessagePromise: z.promise(z.unknown())
  })
  .strict();

export type TFromApiChats = z.infer<typeof FromApiChatsSchema>;
export type TFromApiChat = z.infer<typeof FromApiChatSchema>;
export type TChat = z.infer<typeof ChatSchema>;
export type TChatsPromise = z.infer<typeof ChatsPromiseSchema>;

export type TFromApiChatMessages = z.infer<typeof FromApiChatMessagesSchema>;
export type TFromApiChatMessage = z.infer<typeof FromApiChatMessageSchema>;
export type TChatMessage = z.infer<typeof ChatSchema>;
export type TChatMessagesPromise = z.infer<typeof ChatMessagesPromiseSchema>;
export type TChatMessagePromise = z.infer<typeof ChatMessagePromiseSchema>;
