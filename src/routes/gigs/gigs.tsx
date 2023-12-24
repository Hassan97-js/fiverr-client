import { Suspense } from "react";
import { Await, Form, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  Spinner,
  GigCard,
  CustomInput,
  Button,
  AsyncError,
  LayoutSection
} from "../../components";

import {
  deferredApiGigSchema,
  fromApiGigSchema
} from "../../constants/gig-validator";

import { handleError } from "../../utils/handle-error";

import type { TDeferredGigPromise, TFromApiGig } from "../../types/gig";
import type {
  TLoaderApiResponsePromise,
  TResolvedAxiosResponse
} from "../../types/api";

import "./gigs.css";

const AwaitedPublicGigs = () => {
  const gigsResponse = useAsyncValue() as TResolvedAxiosResponse<TFromApiGig>;

  let isZodError: boolean = false;

  let validGigsData: null | TFromApiGig = null;

  const gigsValidation = fromApiGigSchema.safeParse(gigsResponse.data);

  if (gigsValidation.success) {
    validGigsData = gigsValidation.data;
  } else {
    isZodError = true;
    console.log("Zod validation failed: ", isZodError);

    handleError(gigsValidation.error.issues);
  }

  if (isZodError) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        Could not load gigs
      </p>
    );
  }

  if (!validGigsData?.gigs.length) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        No gigs found
      </p>
    );
  }

  const gigsElements = validGigsData.gigs.map((gig) => {
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

  return <div className="gigs grid gap-10">{gigsElements}</div>;
};

const Gigs = () => {
  const data = useLoaderData() as TLoaderApiResponsePromise<unknown>;

  let gigsPromiseValidationResult: null | TDeferredGigPromise = null;

  const validationResult = deferredApiGigSchema.safeParse(data);

  if (validationResult.success) {
    gigsPromiseValidationResult = validationResult.data;
  }

  return (
    <LayoutSection className="text-neutral-700">
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
          resolve={gigsPromiseValidationResult?.gigsPromise}
          errorElement={<AsyncError errorMessage="Failed to load the gigs" />}>
          <AwaitedPublicGigs />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Gigs;