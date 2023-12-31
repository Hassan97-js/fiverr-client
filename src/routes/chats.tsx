import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import { Spinner, ChatsTable, AsyncError, LayoutSection } from "../components";

import { useUser } from "../hooks/use-user";

const AwaitedChats = () => {
  const chatssResponse = useAsyncValue();
  const user = useUser();

  // const chats = chatsResponse.data;

  // if (!chats?.length) {
  //   return (
  //     <p className="text-neutral-500 text-lg font-medium text-center mt-10">
  //       No messages yet
  //     </p>
  //   );
  // }

  // const tableHeaders = [
  //   { id: 1, text: currentUser?.isSeller ? "Buyer" : "Seller" },
  //   { id: 2, text: "Last Message" },
  //   { id: 3, text: "Date" },
  //   { id: 4, text: "Action" }
  // ];

  // return (
  //   <ChatsTable
  //     tableHeaders={tableHeaders}
  //     tableData={chats}
  //     isSeller={currentUser?.isSeller}
  //     clickable={true}
  //   />
  // );

  return null;
};

const Chats = () => {
  const data = useLoaderData();

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={null}
          errorElement={
            <AsyncError errorMessage="Failed to load the chats!" />
          }>
          <AwaitedChats />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Chats;
