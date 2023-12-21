import { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";

import { AsyncError, MyGigsTable, Spinner } from "../components";

const AwaitedMyGigs = () => {
  const myGigsResponse = useAsyncValue();

  const myGigs = myGigsResponse.data;

  if (!myGigs?.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No ordered gigs yet
      </p>
    );
  }

  const tableHeaders = [
    { id: 1, text: "Image" },
    { id: 2, text: "Title" },
    { id: 3, text: "Price" },
    { id: 4, text: "Sales" },
    { id: 5, text: "Delete" }
  ];

  return <MyGigsTable tableHeaders={tableHeaders} tableData={myGigs} />;
};

const MyGigs = () => {
  const { myGigsPromise } = useLoaderData();

  return (
    <section className="section-container min-h-[37.5rem]">
      <div className="flex items-center justify-end mb-10 max-w-6xl mx-auto">
        <Link to="/add" className="btn btn-primary text-sm">
          Add new gig
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={myGigsPromise}
          errorElement={<AsyncError errorMessage="Failed to load your own gigs" />}>
          <AwaitedMyGigs />
        </Await>
      </Suspense>
    </section>
  );
};

export default MyGigs;
