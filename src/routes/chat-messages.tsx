import { ChatInput, ChatRoom, LayoutSection } from "../components";

import { usePageData, useUser } from "../hooks";

const ChatMessages = () => {
  const chatMessagesData = usePageData({
    dataType: "chatMessages"
  })?.chatMessages;
  const user = useUser();

  const chatMessages = chatMessagesData?.messages;
  const receiver = chatMessagesData?.receiver;

  return (
    <LayoutSection className="flex flex-col min-h-[75rem] py-0 pt-6">
      <ChatRoom userId={user?._id} messages={chatMessages} receiver={receiver} />
      <ChatInput receiverName={receiver?.username} />
    </LayoutSection>
  );
};

export default ChatMessages;
