import { OrdersTable, LayoutSection } from "../components";
import { usePageData, useUser } from "../hooks";

export type TTableHeaders = {
  id: number;
  text: string;
}[];

const Orders = () => {
  const orders = usePageData({ dataType: "orders" })?.orders;
  const user = useUser();

  const tableHeaders = [
    { id: 1, text: "Image" },
    { id: 2, text: "Title" },
    { id: 3, text: "Price" },
    { id: 4, text: user?.isSeller ? "Buyer" : "Seller" },
    { id: 5, text: "Contact" }
  ] satisfies TTableHeaders;

  return (
    <LayoutSection hasLoading={false}>
      {!!orders?.length && <OrdersTable isSeller={user?.isSeller} tableHeaders={tableHeaders} orders={orders} />}
      {!orders?.length && <p className="text-zinc-500 text-lg font-medium text-center w-full h-full">No orders yet</p>}
    </LayoutSection>
  );
};

export default Orders;
