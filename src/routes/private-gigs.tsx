import { Suspense } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";

import { AsyncError, LayoutSection, PrivateGigsTable, Spinner } from "../components";

import { usePrivateGigs } from "../hooks/use-private-gigs";

import { PrivateGigsPromiseSchema } from "../constants/gig-validator";

import type { TPrivateGigsPromise } from "../types/gig.types";

export type TTableHeader = {
  id: number;
  text: string;
};

const AwaitedPrivateGigs = () => {
  const privateGigs = usePrivateGigs();

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
  const data = useLoaderData();

  let gigsPromiseData: null | TPrivateGigsPromise = null;

  const validationResult = PrivateGigsPromiseSchema.safeParse(data);

  if (validationResult.success) {
    gigsPromiseData = validationResult.data;
  }

  return (
    <LayoutSection>
      <div className="flex items-center justify-end mb-10 max-w-6xl mx-auto">
        <Link to="/add" className="btn btn-primary text-sm">
          Add new gig
        </Link>
      </div>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={gigsPromiseData?.privateGigsPromise}
          errorElement={<AsyncError errorMessage="Failed to load your own gigs" />}>
          <AwaitedPrivateGigs />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default PrivateGigs;
