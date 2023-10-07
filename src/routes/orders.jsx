import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import { useCurrentUserContext } from "../context";
import { Spinner, OrdersTable, AsyncError } from "../components";

const AwaitedOrders = () => {
  const ordersResponse = useAsyncValue();
  const { currentUser } = useCurrentUserContext();

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
    <>
      <OrdersTable
        isSeller={currentUser?.isSeller}
        tableHeaders={tableHeaders}
        tableData={completedOrders}
      />
    </>
  );
};

const Orders = () => {
  const { ordersPromise } = useLoaderData();

  return (
    <section className="section-container min-h-[37.5rem]">
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={ordersPromise}
          errorElement={<AsyncError errorMessage="Failed to load the orders!" />}>
          <AwaitedOrders />
        </Await>
      </Suspense>
    </section>
  );
};

export default Orders;
