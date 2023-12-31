import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  AsyncError,
  ChatInput,
  ChatRoom,
  LayoutSection,
  Spinner
} from "../components";

import { useUser } from "../hooks/use-user";

const AwaitedChatMessages = () => {
  const messagesResponse = useAsyncValue();
  const user = useUser();

  const messages = messagesResponse.data;

  return (
    <>
      <ChatRoom userId={currentUser?.id} messages={messages} />
      <ChatInput />
    </>
  );
};

const ChatMessages = () => {
  // data.chatMessagesPromise
  const data = useLoaderData();

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={null}
          errorElement={<AsyncError errorMessage="Failed to load the messages" />}>
          <AwaitedChatMessages />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default ChatMessages;
