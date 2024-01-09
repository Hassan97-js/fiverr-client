import { ChatsTable, LayoutSection } from "../components";

import { usePageData, useUser } from "../hooks";

export type TChatsTableHeaders = {
  id: number;
  text: string;
}[];

const Chats = () => {
  const chats = usePageData({ dataType: "chats" })?.chats;
  const user = useUser();

  if (!chats?.length) {
    return (
      <p className="text-zinc-500 text-lg font-medium text-center mt-10">
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
    <LayoutSection>
      <ChatsTable
        tableHeaders={tableHeaders}
        tableData={chats}
        isSeller={user?.isSeller}
        clickable={true}
      />
    </LayoutSection>
  );
};

export default Chats;
