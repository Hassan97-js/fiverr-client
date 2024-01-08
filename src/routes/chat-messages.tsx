import { ChatInput, ChatRoom, LayoutSection } from "../components";

import { usePageData, useUser } from "../hooks";

const ChatMessages = () => {
  const chatMessages = usePageData({
    dataType: "chatMessages"
  })?.chatMessages;
  const user = useUser();

  return (
    <LayoutSection className="min-h-[75rem] flex flex-col py-0 pt-6">
      <ChatRoom userId={user?._id} messages={chatMessages} />
      <ChatInput userName={user?.username} />
    </LayoutSection>
  );
};

export default ChatMessages;
