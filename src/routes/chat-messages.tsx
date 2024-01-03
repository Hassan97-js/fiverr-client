import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  ErrorAlert,
  ChatInput,
  ChatRoom,
  LayoutSection,
  Spinner
} from "../components";

import { useDeferredData, useUser } from "../hooks";
import { useChatMessages } from "../hooks/use-chat-messages";

const AwaitedChatMessages = () => {
  const chatMessages = useChatMessages();
  const user = useUser();

  return (
    <>
      <ChatRoom userId={user?._id} messages={chatMessages} />
      <ChatInput userName={user?.username} />
    </>
  );
};

const ChatMessages = () => {
  const chatMessagesPromiseData = useDeferredData({
    promiseType: "chatMessagesPromise"
  });

  return (
    <LayoutSection className="min-h-[75rem] flex flex-col py-0 pt-6">
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={chatMessagesPromiseData?.chatMessagesPromise}
          errorElement={<ErrorAlert errorMessage="Failed to load the messages" />}>
          <AwaitedChatMessages />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default ChatMessages;
