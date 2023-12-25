import { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";

import { AsyncError, LayoutSection, PrivateGigsTable, Spinner } from "../components";

const AwaitedPrivateGigs = () => {
  const privateGigsResponse = useAsyncValue();

  const privateGigs = privateGigsResponse.data;

  if (!privateGigs?.length) {
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

  return <PrivateGigsTable tableHeaders={tableHeaders} tableData={privateGigs} />;
};

const PrivateGigs = () => {
  const data = useLoaderData();

  // Todo: Validate Private Gig data with Zod

  return (
    <LayoutSection>
      <div className="flex items-center justify-end mb-10 max-w-6xl mx-auto">
        <Link to="/add" className="btn btn-primary text-sm">
          Add new gig
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={data.privateGigsPromise}
          errorElement={<AsyncError errorMessage="Failed to load your own gigs" />}>
          <AwaitedPrivateGigs />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default PrivateGigs;
