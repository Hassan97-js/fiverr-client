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

const AwaitedChatMessages = () => {
  // const messagesResponse = useAsyncValue();
  // const user = useUser();

  // const messages = messagesResponse.data;

  return (
    // <>
    //   <ChatRoom userId={currentUser?.id} messages={messages} />
    //   <ChatInput />
    // </>
    null
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
