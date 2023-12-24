import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import { Spinner, OrdersTable, AsyncError, LayoutSection } from "../components";
import { useUserContext } from "../context";

const AwaitedOrders = () => {
  const ordersResponse = useAsyncValue();
  const { currentUser } = useUserContext();

  const completedOrders = ordersResponse.data;

  if (!completedOrders?.length) {
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
    { id: 4, text: currentUser?.isSeller ? "Buyer" : "Seller" },
    { id: 5, text: "Contact" }
  ];

  return (
    <OrdersTable
      isSeller={currentUser?.isSeller}
      tableHeaders={tableHeaders}
      tableData={completedOrders}
    />
  );
};

const Orders = () => {
  const { ordersPromise } = useLoaderData();

  return (
    <LayoutSection>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={ordersPromise}
          errorElement={<AsyncError errorMessage="Failed to load the orders!" />}>
          <AwaitedOrders />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Orders;
