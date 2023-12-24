import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import { Spinner, MessagesTable, AsyncError, LayoutSection } from "../components";

import { useUserContext } from "../context";

const AwaitedConversations = () => {
  const conversationsResponse = useAsyncValue();
  const { currentUser } = useUserContext();

  const conversations = conversationsResponse.data;

  if (!conversations?.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No messages yet
      </p>
    );
  }

  const tableHeaders = [
    { id: 1, text: currentUser?.isSeller ? "Buyer" : "Seller" },
    { id: 2, text: "Last Message" },
    { id: 3, text: "Date" },
    { id: 4, text: "Action" }
  ];

  return (
    <MessagesTable
      tableHeaders={tableHeaders}
      tableData={conversations}
      isSeller={currentUser?.isSeller}
      clickable={true}
    />
  );
};

const Messages = () => {
  const { conversationsPromise } = useLoaderData();

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={conversationsPromise}
          errorElement={
            <AsyncError errorMessage="Failed to load the conversations!" />
          }>
          <AwaitedConversations />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Messages;
