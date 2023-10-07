import ChatMessage from "./chat-message";

const ChatRoom = ({ userId, messages = [] }) => {
  return (
    <div className="flex flex-col bg-neutral-50/80 w-full p-8 rounded-lg">
      {messages.length ? (
        messages.map((message) => {
          const { _id: id, userId: userInfo } = message;

          const isSender = userId === userInfo._id;
          const userImage = userInfo?.imgURL;

          return (
            <ChatMessage
              key={id}
              senderUsername={userInfo.username}
              isSender={isSender}
              userImage={userImage}
              text={message.text}
            />
          );
        })
      ) : (
        <p className="text-neutral-500 text-lg font-medium text-center mt-10">
          No messages yet
        </p>
      )}
    </div>
  );
};

export default ChatRoom;
