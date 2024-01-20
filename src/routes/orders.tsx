import { OrdersTable, LayoutSection } from "../components";
import { usePageData, useUser } from "../hooks";

export type TTableHeaders = {
  id: number;
  text: string;
}[];

const Orders = () => {
  const orders = usePageData({ dataType: "orders" })?.orders;
  const user = useUser();

  if (!orders?.length) {
    return <p className="text-zinc-500 text-lg font-medium text-center mt-40">No orders yet</p>;
  }

  const tableHeaders = [
    { id: 1, text: "Image" },
    { id: 2, text: "Title" },
    { id: 3, text: "Price" },
    { id: 4, text: user?.isSeller ? "Buyer" : "Seller" },
    { id: 5, text: "Contact" }
  ] satisfies TTableHeaders;

  return (
    <LayoutSection>
      <OrdersTable isSeller={user?.isSeller} tableHeaders={tableHeaders} tableData={orders} />
    </LayoutSection>
  );
};

export default Orders;
