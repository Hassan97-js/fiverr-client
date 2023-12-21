import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import { useUserContext } from "../context";
import { AsyncError, Breadcrumb, ChatInput, ChatRoom, Spinner } from "../components";

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
    <section className="section-container min-h-[37.5rem]">
      <Breadcrumb />
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={messagesPromise}
          errorElement={<AsyncError errorMessage="Failed to load the messages!" />}>
          <AwaitedMessages />
        </Await>
      </Suspense>
    </section>
  );
};

export default Message;
