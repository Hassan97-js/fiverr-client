import ChatMessage from "./chat-message";

import { type TChatMessage } from "../../constants/validators/chat-validator";

type TProps = {
  messages?: TChatMessage[] | null;
  userId?: string;
};

const ChatRoom = ({ userId: currentUserId, messages }: TProps) => {
  return (
    <div className="flex flex-col bg-zinc-50/80 w-full p-8 rounded-lg flex-1 h-full">
      {messages?.length ? (
        messages.map((message) => {
          const { _id: id, userId: userInfo } = message;

          let messageUserId: null | string = null;
          let messageUserImage: null | string | undefined = null;
          let messageUserName: null | string | undefined = null;

          if (typeof userInfo !== "string") {
            messageUserId = userInfo._id;
            messageUserImage = userInfo.image;
            messageUserName = userInfo.username;
          }

          const isSender = currentUserId === messageUserId;

          return (
            <ChatMessage
              key={id}
              senderUsername={messageUserName}
              isSender={isSender}
              userImage={messageUserImage}
              text={message.text}
            />
          );
        })
      ) : (
        <p className="text-zinc-400 text-base font-medium text-center m-auto">No messages yet</p>
      )}
    </div>
  );
};

export default ChatRoom;
