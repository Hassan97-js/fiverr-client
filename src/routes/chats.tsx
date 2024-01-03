import { Suspense } from "react";
import { Await } from "react-router-dom";

import { Spinner, ChatsTable, ErrorAlert, LayoutSection } from "../components";

import { useChats, useDeferredData, useUser } from "../hooks";

export type TChatsTableHeaders = {
  id: number;
  text: string;
}[];

const AwaitedChats = () => {
  const chats = useChats();
  const user = useUser();

  if (!chats?.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No chats yet
      </p>
    );
  }

  const tableHeaders = [
    { id: 1, text: user?.isSeller ? "Buyer" : "Seller" },
    { id: 2, text: "Last Message" },
    { id: 3, text: "Date" },
    { id: 4, text: "Action" }
  ] satisfies TChatsTableHeaders;

  return (
    <ChatsTable
      tableHeaders={tableHeaders}
      tableData={chats}
      isSeller={user?.isSeller}
      clickable={true}
    />
  );
};

const Chats = () => {
  const chatsPromiseData = useDeferredData({ promiseType: "chatsPromise" });

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={chatsPromiseData?.chatsPromise}
          errorElement={<ErrorAlert errorMessage="Failed to load the chats!" />}>
          <AwaitedChats />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Chats;
