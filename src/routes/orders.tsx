import { Suspense } from "react";
import { Await } from "react-router-dom";

import { Spinner, OrdersTable, ErrorAlert, LayoutSection } from "../components";
import { useUser } from "../hooks/use-user";
import { useDeferredData } from "../hooks";
import { useOrders } from "../hooks/use-orders";

export type TTableHeaders = {
  id: number;
  text: string;
}[];

const AwaitedOrders = () => {
  const orders = useOrders();
  const user = useUser();

  if (!orders?.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No orders yet
      </p>
    );
  }

  const tableHeaders = [
    { id: 1, text: "Image" },
    { id: 2, text: "Title" },
    { id: 3, text: "Price" },
    { id: 4, text: user?.isSeller ? "Buyer" : "Seller" },
    { id: 5, text: "Contact" }
  ] satisfies TTableHeaders;

  return (
    <OrdersTable
      isSeller={user?.isSeller}
      tableHeaders={tableHeaders}
      tableData={orders}
    />
  );
};

const Orders = () => {
  const orderPromiseData = useDeferredData({ promiseType: "ordersPromise" });

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={orderPromiseData?.ordersPromise}
          errorElement={<ErrorAlert errorMessage="Failed to load the orders!" />}>
          <AwaitedOrders />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Orders;
