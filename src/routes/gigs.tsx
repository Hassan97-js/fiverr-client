import { Suspense } from "react";
import { Await, Form } from "react-router-dom";

import {
  Spinner,
  GigCard,
  CustomInput,
  Button,
  AsyncError,
  LayoutSection
} from "../components";

import { useDeferredData, useGigs } from "../hooks";

const AwaitedPublicGigs = () => {
  const gigs = useGigs();

  if (!gigs) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        Could not load gigs
      </p>
    );
  }

  if (!gigs.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No gigs found
      </p>
    );
  }

  const gigsElements = gigs.map((gig) => {
    const {
      _id: gigId,
      coverImage,
      price,
      description,
      category,
      totalStars,
      starNumber,
      userId: userInfo
    } = gig;

    return (
      <GigCard
        key={gigId}
        userInfo={userInfo}
        gigId={gigId}
        totalStars={totalStars}
        starNumber={starNumber}
        coverImage={coverImage}
        price={price}
        description={description}
        category={category}
      />
    );
  });

  return (
    <div className="grid grid-cols-min-max-16.25rem-1fr gap-10">{gigsElements}</div>
  );
};

const Gigs = () => {
  const gigsPromiseData = useDeferredData({ promiseType: "gigsPromise" });

  return (
    <LayoutSection className="text-neutral-700">
      <h1 className="mb-4">AI Artists</h1>
      <p>
        Explore the boundaries of art and technology with Fiverr&apos;s AI artists
      </p>

      <Form method="GET" className="flex flex-col items-start py-5 gap-5 mt-6 mb-24">
        <div className="flex flex-col items-start mb-5 gap-5">
          <CustomInput
            id="min"
            labelClassName="text-neutral-600"
            labelText="Min price"
            name="min"
            placeholder="min"
            required={false}
          />

          <CustomInput
            id="max"
            labelClassName="text-neutral-600"
            labelText="Max price"
            name="max"
            placeholder="max"
            required={false}
          />
        </div>

        <div className="flex flex-col w-96">
          <span className="font-medium -mb-2 text-neutral-600">Sort by</span>
          <select
            name="sortBy"
            defaultValue="createdAt"
            className="bg-white border border-neutral-300 outline-0 radius-base p-3 my-4 w-52 cursor-pointer rounded-sm">
            <option value="createdAt">Newest</option>
            <option value="sales">Best Selling</option>
          </select>
        </div>

        <Button type="submit" className="btn btn-secondary btn-xs tracking-wide">
          Apply
        </Button>
      </Form>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={gigsPromiseData?.gigsPromise}
          errorElement={<AsyncError errorMessage="Failed to load the gigs" />}>
          <AwaitedPublicGigs />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Gigs;
