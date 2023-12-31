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
    lastMessage: z.string().trim().toLowerCase().max(400, {
      message: "A chat message must be max 400 characters long"
    }),
    readBySeller: z.boolean(),
    readByBuyer: z.boolean(),
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

export type TFromApiChats = z.infer<typeof FromApiChatsSchema>;
export type TFromApiChat = z.infer<typeof FromApiChatSchema>;
export type TChat = z.infer<typeof ChatSchema>;
export type TChatsPromise = z.infer<typeof ChatsPromiseSchema>;
