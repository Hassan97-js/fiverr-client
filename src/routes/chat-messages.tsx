import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  AsyncError,
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
      <ChatRoom userId={user?.id} messages={chatMessages} />
      <ChatInput />
    </>
  );
};

const ChatMessages = () => {
  const chatMessagesPromiseData = useDeferredData({
    promiseType: "chatMessagesPromise"
  });

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={chatMessagesPromiseData?.chatMessagesPromise}
          errorElement={<AsyncError errorMessage="Failed to load the messages" />}>
          <AwaitedChatMessages />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default ChatMessages;
