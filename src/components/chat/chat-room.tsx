import ChatMessage from "./chat-message";
import { ChatAvatar } from "./chat-avatar";

import { type TChatMessage } from "../../constants/validators/chat-validator";
import { TUser } from "../../constants/validators/user-validator";

type TProps = {
  messages?: TChatMessage[] | null;
  userId?: string;
  receiver?: TUser;
};

const ChatRoom = ({ userId: currentUserId, messages, receiver }: TProps) => {
  return (
    <div className="flex flex-col flex-auto bg-zinc-50/40 w-full p-8 rounded-lg h-full">
      <ChatAvatar image={receiver?.image} name={receiver?.username} email={receiver?.email} />

      <div className="flex flex-col pt-10 pb-5 w-full h-full flex-auto">
        {messages?.map((message) => {
          const { _id: id, userId: userInfo } = message;

          let messageUserId: null | string = null;
          let messageUserImage: null | string | undefined = null;

          if (typeof userInfo !== "string") {
            messageUserId = userInfo._id;
            messageUserImage = userInfo.image;
          }

          const isSender = currentUserId === messageUserId;

          return (
            messageUserImage && (
              <ChatMessage key={id} isSender={isSender} userImage={messageUserImage} text={message.text} />
            )
          );
        })}
      </div>
    </div>
  );
};

export default ChatRoom;
