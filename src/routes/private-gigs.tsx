import { Suspense } from "react";
import { Await, Link } from "react-router-dom";

import {
  ErrorAlert,
  Button,
  LayoutSection,
  PrivateGigsTable,
  Spinner
} from "../components";

import { useDeferredData, useGigs } from "../hooks";

export type TTableHeader = {
  id: number;
  text: string;
};

const AwaitedPrivateGigs = () => {
  const privateGigs = useGigs();

  if (!privateGigs) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        Could not load gigs
      </p>
    );
  }

  if (!privateGigs?.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No gigs found
      </p>
    );
  }

  const tableHeaders = [
    { id: 1, text: "Image" },
    { id: 2, text: "Title" },
    { id: 3, text: "Price" },
    { id: 4, text: "Sales" },
    { id: 5, text: "Delete" }
  ] satisfies TTableHeader[];

  return <PrivateGigsTable tableHeaders={tableHeaders} tableData={privateGigs} />;
};

const PrivateGigs = () => {
  const gigsPromiseData = useDeferredData({ promiseType: "privateGigsPromise" });

  return (
    <LayoutSection>
      <div className="flex items-center justify-end mb-10 max-w-6xl mx-auto">
        <Link to="/add">
          <Button variant="primary" size="sm">
            Add new gig
          </Button>
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={gigsPromiseData?.privateGigsPromise}
          errorElement={<ErrorAlert errorMessage="Failed to load your own gigs" />}>
          <AwaitedPrivateGigs />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default PrivateGigs;
