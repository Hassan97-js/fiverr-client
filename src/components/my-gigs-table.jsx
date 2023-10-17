import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import CustomIcon from "./custom-icon";
import Button from "./custom-button/button";
import Table, { TableBody, TableHead } from "./table";

import { formatCurrency } from "../utils";

const MyGigsTable = ({ tableHeaders = [], tableData = [], clickable = false }) => {
  const [clickedGigId, setClickedGigId] = useState(null);

  const { state } = useNavigation();

  const isBusy = state === "submitting";

  const tableHeaderElements = tableHeaders.map((tableHeader, idx) => {
    return (
      <th key={idx} scope="col" className="px-6 py-3">
        {tableHeader.text}
      </th>
    );
  });

  const tableBodyElements = tableData.map((item) => {
    const { _id: id, gigCoverImage: image, title, price, sales } = item;

    return (
      <tr
        key={id}
        className={`border-b ${clickable ? "cursor-pointer" : ""} ${
          isBusy && clickedGigId === id ? "opacity-30" : ""
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
          {sales ? sales : "0"}
        </td>

        <td
          role="button"
          scope="row"
          className="px-6 py-4 font-medium text-danger-500">
          <Form method="DELETE">
            <input type="hidden" name="gigId" value={id} />

            <Button
              onClickHandler={() => setClickedGigId(id)}
              disabled={isBusy}
              type="submit">
              <CustomIcon color="#ef4444" icon={FaTrash} aria-label="A trash icon" />
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

export default MyGigsTable;
