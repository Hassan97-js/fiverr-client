import { useState } from "react";
import { Form } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import { type TTableHeaders } from "../routes/orders";

import Button from "./button";
import CustomIcon from "./custom-icon";
import Table, { TableBody, TableHead } from "./table";

import { type TOrder } from "../constants/validators/order-validator";

import { capitalize, formatCurrency } from "../utils";

type TProps = {
  tableHeaders: TTableHeaders;
  tableData: TOrder[];
  striped?: boolean;
  isSeller?: boolean;
  clickable?: boolean;
};

const OrdersTable = ({
  tableHeaders = [],
  tableData = [],
  striped = true,
  isSeller = false,
  clickable = false
}: TProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tableHeaderElements = tableHeaders.map((tableHeader, idx) => {
    return (
      <th key={idx} scope="col" className="px-6 py-3">
        {tableHeader.text}
      </th>
    );
  });

  const tableBodyElements = tableData.map((item, idx) => {
    const {
      _id: id,
      sellerId: sellerInfo,
      buyerId: buyerInfo,
      gigId: gigInfo
    } = item;

    let image: null | string | undefined = null;
    let title: null | string | undefined = null;
    let price: null | number | undefined = null;

    if (typeof gigInfo !== "string") {
      image = gigInfo.coverImage;
      title = gigInfo.title;
      price = gigInfo.price;
    }

    let buyerUserName: null | string = null;
    let buyerId: null | string = null;
    let sellerUserName: null | string = null;
    let sellerId: null | string = null;

    if (typeof buyerInfo !== "string") {
      buyerUserName = buyerInfo.username;
      buyerId = buyerInfo._id;
    }

    if (typeof sellerInfo !== "string") {
      sellerUserName = sellerInfo.username;
      sellerId = sellerInfo._id;
    }

    return (
      <tr
        key={id}
        className={`border-b ${clickable ? "cursor-pointer" : ""} ${
          striped && idx % 2 !== 0 ? "bg-zinc-50" : ""
        }`}>
        <td
          scope="row"
          className="px-6 py-4 font-medium text-zinc-500 whitespace-nowrap">
          {image ? (
            <img
              className="max-w-none w-12 h-12 object-cover object-center rounded-full"
              src={image}
              alt=""
            />
          ) : (
            "-"
          )}
        </td>

        <td
          scope="row"
          className="px-6 py-4 font-medium text-zinc-500 whitespace-nowrap capitalize">
          {title}
        </td>

        <td
          scope="row"
          className="px-6 py-4 font-medium text-zinc-500 whitespace-nowrap">
          {price ? formatCurrency(price) : "-"}
        </td>

        <td
          scope="row"
          className="px-6 py-4 font-medium text-zinc-500 whitespace-nowrap">
          {buyerUserName && isSeller ? capitalize(buyerUserName) : ""}
          {sellerUserName && !isSeller ? capitalize(sellerUserName) : ""}
          {(!buyerUserName || !sellerUserName) && "-"}
        </td>

        <td
          role="button"
          scope="row"
          className="px-6 py-4 font-medium text-zinc-500">
          <Form method="POST">
            <input type="hidden" name="sellerId" value={sellerId || ""} />
            <input type="hidden" name="buyerId" value={buyerId || ""} />
            <input type="hidden" name="isSeller" value={String(isSeller)} />

            <Button type="submit" onClick={() => setIsTransitioning(true)}>
              <CustomIcon Icon={FaEnvelope} aria-label="An Envelope icon" />
            </Button>
          </Form>
        </td>
      </tr>
    );
  });

  return (
    <Table isLoading={isTransitioning}>
      <TableHead>{tableHeaderElements}</TableHead>
      <TableBody>{tableBodyElements}</TableBody>
    </Table>
  );
};

export default OrdersTable;
