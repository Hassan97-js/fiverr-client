import { Form, Link, useNavigation } from "react-router-dom";

import Button from "./button";
import Table, { TableBody, TableHead } from "./table";

import { type TChatsTableHeaders } from "../routes/chats";

import { type TChat } from "../constants/validators/chat-validator";
import { capitalize, formatDateToNow } from "../utils";

type TProps = {
  tableHeaders: TChatsTableHeaders;
  tableData: TChat[];
  isSeller?: boolean;
  clickable?: boolean;
};

const ChatsTable = ({ tableHeaders, tableData, isSeller, clickable = false }: TProps) => {
  const navigation = useNavigation();

  const isBusy = navigation.state === "submitting";

  const tableHeaderElements = tableHeaders.map((tableHeader, idx) => {
    return (
      <th key={idx} scope="col" className="px-6 py-3">
        {tableHeader.text}
      </th>
    );
  });

  const tableBodyElements = tableData.map((item) => {
    const {
      _id: id,
      chatId,
      sellerId: sellerInfo,
      buyerId: buyerInfo,
      readByBuyer,
      readBySeller,
      updatedAt,
      lastMessage
    } = item;

    const isNotReadBySeller = isSeller && !readBySeller;
    const isNotReadByBuyer = !isSeller && !readByBuyer;

    let sellerUserName: null | string = null;
    let buyerUserName: null | string = null;

    if (typeof sellerInfo !== "string") {
      sellerUserName = sellerInfo.username;
    }

    if (typeof buyerInfo !== "string") {
      buyerUserName = buyerInfo.username;
    }

    return (
      <tr
        key={id}
        className={`border-b ${clickable ? "cursor-pointer" : ""} ${
          isNotReadBySeller || isNotReadByBuyer ? "bg-green-100/60" : ""
        }`}>
        <td role="button" scope="row" className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
          <Link to={`/chat-messages/${chatId}`}>
            {isSeller && buyerUserName
              ? capitalize(buyerUserName)
              : !isSeller && sellerUserName
              ? capitalize(sellerUserName)
              : "-"}
          </Link>
        </td>

        <td role="button" scope="row" className="px-6 py-4 font-medium text-gray-500 max-w-20 truncate">
          <Link to={`/chat-messages/${chatId}`}>{lastMessage ? lastMessage : "-"}</Link>
        </td>

        <td scope="row" className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap">
          {updatedAt ? formatDateToNow(updatedAt) : "-"}
        </td>

        <td scope="row" className="px-6 py-4 whitespace-nowrap">
          {isNotReadByBuyer || isNotReadBySeller ? (
            <Form method="PUT">
              <input type="hidden" name="id" value={chatId} />

              <Button
                type="submit"
                disabled={isBusy}
                variant="primary"
                size="sm"
                className={`tracking-wide ${isBusy ? "bg-green-400" : ""}`}>
                Mark as read
              </Button>
            </Form>
          ) : (
            "-"
          )}
        </td>
      </tr>
    );
  });

  return (
    <Table>
      <TableHead>{tableHeaderElements}</TableHead>
      <TableBody>{tableBodyElements}</TableBody>
    </Table>
  );
};

export default ChatsTable;
