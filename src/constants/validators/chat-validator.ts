import { z } from "zod";

import { UserSchema } from "./user-validator";
import { ObjectIdSchema } from "./id-validator";

export const ChatSchema = z
  .object({
    _id: ObjectIdSchema,
    chatId: z.string().trim().toLowerCase().max(49, {
      message: "Chat id must be 49 characters long"
    }),
    sellerId: z.union([UserSchema, ObjectIdSchema]),
    buyerId: z.union([UserSchema, ObjectIdSchema]),
    lastMessage: z
      .string()
      .trim()
      .toLowerCase()
      .max(2000, {
        message: "A chat message must be max 2000 characters long"
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
    chatId: z.string().trim().max(49, {
      message: "Chat id must be 49 characters long"
    }),

    userId: z.union([UserSchema, ObjectIdSchema]),
    text: z.string().trim().max(2000, {
      message: "A chat message must be max 2000 characters long"
    }),
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

export const FromApiChatMessagesSchema = z
  .object({
    success: z.boolean(),
    chatMessages: z.array(ChatMessageSchema),
    receiver: z.object({
      _id: ObjectIdSchema,
      username: z.string(),
      email: z.string().email(),
      country: z.string(),
      isSeller: z.boolean(),
      image: z.string()
    })
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
export type TChatMessage = z.infer<typeof ChatMessageSchema>;
export type TChatMessagesPromise = z.infer<typeof ChatMessagesPromiseSchema>;
export type TChatMessagePromise = z.infer<typeof ChatMessagePromiseSchema>;
