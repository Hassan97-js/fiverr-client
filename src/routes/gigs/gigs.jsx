import { Suspense } from "react";
import { Await, Form, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  Spinner,
  GigCard,
  Breadcrumb,
  CustomInput,
  Button,
  AsyncError
} from "../../components";

import "./gigs.css";

const AwaitedPublicGigs = () => {
  const publicGigsResponse = useAsyncValue();

  const publicGigs = publicGigsResponse.data;

  if (!publicGigs?.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No gigs found
      </p>
    );
  }

  const publicGigsElements = publicGigs.map((gig) => {
    const {
      _id: gigId,
      gigCoverImg,
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
        gigCoverImg={gigCoverImg}
        price={price}
        description={description}
        category={category}
      />
    );
  });

  return <div className="gigs grid gap-10">{publicGigsElements}</div>;
};

const Gigs = () => {
  const { gigsPromise } = useLoaderData();

  return (
    <section className="gigs-section section-container text-neutral-700 min-h-[37.5rem]">
      <Breadcrumb>FIVERR &gt; GRAPHICS & DESIGN &gt;</Breadcrumb>

      <h1 className="mb-4">AI Artists</h1>
      <p>
        Explore the boundaries of art and technology with Fiverr&apos;s AI artists
      </p>

      <Form method="GET" className="flex flex-col items-start py-5 gap-5 mt-6 mb-24">
        <div className="flex flex-col items-start mb-5 gap-5">
          <CustomInput
            inputId="min"
            lableClassNames="text-neutral-600"
            labelText="Min price"
            inputName="min"
            placeholderText="min"
            isRequired={false}
          />

          <CustomInput
            inputId="max"
            lableClassNames="text-neutral-600"
            labelText="Max price"
            inputName="max"
            placeholderText="max"
            isRequired={false}
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
          resolve={gigsPromise}
          errorElement={<AsyncError errorMessage="Failed to load the gigs!" />}>
          <AwaitedPublicGigs />
        </Await>
      </Suspense>
    </section>
  );
};

export default Gigs;
