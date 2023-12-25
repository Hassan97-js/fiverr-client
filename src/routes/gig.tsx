import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import {
  AboutSeller,
  Slider,
  Reviews,
  GigCTA,
  Spinner,
  AsyncError,
  LayoutSection
} from "../components";

import { ExternalGigSchemaPromise } from "../constants/gig-validator";

import { useUser } from "../hooks/use-user";
import { useGig } from "../hooks/use-gig";

import { responsiveConfig } from "../data/client/ts/ui";

import type { TExternalGigPromise } from "../types/gig.types";

const AwaitedGig = () => {
  const user = useUser();
  const { gig, reviews } = useGig();

  if (!user || !gig) {
    return (
      <p className="text-neutral-500 text-lg font-medium text-center mt-10">
        Could not load the gig
      </p>
    );
  }

  const {
    title,
    description,
    totalStars,
    images,
    userId: userInfo,
    features: services,
    deliveryTime: deliveryDays,
    price,
    revisionNumber,
    shortTitle,
    shortDescription
  } = gig;

  let gigUserId: string | null = null;
  let userImage: string | null | undefined = null;
  let userName: string | null = null;
  let country: string | null = null;

  if (typeof userInfo !== "string") {
    gigUserId = userInfo._id;
    userImage = userInfo?.image;
    userName = userInfo.username;
    country = userInfo.country;
  }

  const fallbackImage = "https://picsum.photos/200";

  return (
    <div className="block grid-cols-none gap-0 xl:grid xl:grid-cols-2fr-1fr xl:gap-14">
      <div className="flex flex-col gap-20">
        <div>
          <h1 className="capitalize mb-14">{title}</h1>

          <Slider
            itemClass="mr-10 rounded-lg overflow-hidden"
            containerClass="max-w-3xl rounded-md mb-10"
            responsiveConfig={responsiveConfig}>
            {images.map((image) => {
              return (
                <img
                  className="w-full h-full object-cover"
                  key={image}
                  src={image}
                  alt=""
                />
              );
            })}
          </Slider>

          <div>
            <h2 className="mb-4">About This Gig</h2>
            <p>{description}</p>
          </div>
        </div>

        <AboutSeller
          currentUserId={user?._id}
          gigUserId={gigUserId}
          sellerName={userName}
          aboutSeller={`My name is ${userName}, I enjoy creating AI generated art in my spare time. I have a lot of experience using the AI program and that means I know what to prompt the AI with to get a great and incredibly detailed result.`}
          country={country}
          languages="English"
          lastDelivery="1 day"
          memberDate="Aug 2022"
          rating={totalStars}
          responseTime="4 hours"
          sellerImage={userImage || fallbackImage}
        />

        <Reviews gigUserId={gigUserId} reviews={reviews} />
      </div>

      <GigCTA
        currentUserId={user?._id}
        isSeller={user?.isSeller}
        gigUserId={gigUserId}
        deliveryDays={deliveryDays}
        description={shortDescription}
        price={price}
        priceText={shortTitle}
        revisionsNumber={revisionNumber}
        services={services}
      />
    </div>
  );
};

const Gig = () => {
  const data = useLoaderData();

  let validGigPromise: null | TExternalGigPromise = null;

  const validatedGigPromise = ExternalGigSchemaPromise.safeParse(data);

  if (validatedGigPromise.success) {
    validGigPromise = validatedGigPromise.data;
  }

  return (
    <LayoutSection className="relative text-neutral-700">
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={validGigPromise?.gigPromise}
          errorElement={<AsyncError errorMessage="Failed to load the gig" />}>
          <AwaitedGig />
        </Await>
      </Suspense>
    </LayoutSection>
  );
};

export default Gig;
