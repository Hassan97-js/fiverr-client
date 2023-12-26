import { Form } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import Button from "./button";
import CustomIcon from "./custom-icon";
import Table, { TableBody, TableHead } from "./table";

import { capitalize, formatCurrency } from "../utils";

const OrdersTable = ({
  tableHeaders = [],
  tableData = [],
  striped = true,
  isSeller = false,
  clickable = false
}) => {
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

    const { coverImage: image, title, price } = gigInfo;

    return (
      <tr
        key={id}
        className={`border-b ${clickable ? "cursor-pointer" : ""} ${
          striped && idx % 2 !== 0 ? "bg-neutral-50" : ""
        }`}>
        <td
          scope="row"
          className="px-6 py-4 font-medium text-neutral-500 whitespace-nowrap">
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
          className="px-6 py-4 font-medium text-neutral-500 whitespace-nowrap">
          {title}
        </td>

        <td
          scope="row"
          className="px-6 py-4 font-medium text-neutral-500 whitespace-nowrap">
          {price ? formatCurrency(price) : "-"}
        </td>

        <td
          scope="row"
          className="px-6 py-4 font-medium text-neutral-500 whitespace-nowrap">
          {buyerInfo.username || sellerInfo.username
            ? capitalize(isSeller ? buyerInfo.username : sellerInfo.username)
            : "-"}
        </td>

        <td
          role="button"
          scope="row"
          className="px-6 py-4 font-medium text-neutral-500">
          <Form method="POST">
            <input type="hidden" name="sellerId" value={sellerInfo._id} />
            <input type="hidden" name="buyerId" value={buyerInfo._id} />
            <input type="hidden" name="isSeller" value={isSeller} />

            <Button type="submit">
              <CustomIcon Icon={FaEnvelope} aria-label="An Envelope icon" />
            </Button>
          </Form>
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

export default OrdersTable;
