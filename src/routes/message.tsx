import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  AsyncError,
  ChatInput,
  ChatRoom,
  LayoutSection,
  Spinner
} from "../components";

import { useUserContext } from "../context";

const AwaitedMessages = () => {
  const messagesResponse = useAsyncValue();
  const { currentUser } = useUserContext();

  const messages = messagesResponse.data;

  return (
    <>
      <ChatRoom userId={currentUser?.id} messages={messages} />
      <ChatInput />
    </>
  );
};

const Message = () => {
  const { messagesPromise } = useLoaderData();

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={messagesPromise}
          errorElement={<AsyncError errorMessage="Failed to load the messages" />}>
          <AwaitedMessages />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Message;