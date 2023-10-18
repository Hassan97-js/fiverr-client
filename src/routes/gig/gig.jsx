import { Suspense } from "react";
import { Await, useAsyncValue, useLoaderData } from "react-router-dom";

import {
  AboutSeller,
  Breadcrumb,
  Slider,
  Reviews,
  GigCTA,
  Spinner,
  AsyncError
} from "../../components";
import { useUserContext } from "../../context";

import { uiConfig } from "../../data";

import "./gig.css";

const { responsive } = uiConfig;

const AwaitedGig = () => {
  const [gigResponse, reviewsResponse] = useAsyncValue();
  const { currentUser } = useUserContext();

  const gig = gigResponse.data;
  const reviews = reviewsResponse.data;

  const {
    title,
    description,
    starNumber,
    gigImages,
    userId: userInfo,
    features: services,
    deliveryTime: deliveryDays,
    price,
    revisionNumber,
    shortTitle,
    shortDescription
  } = gig;

  const { _id: gigUserId, image, username, country } = userInfo;

  const fallbackImage = "https://picsum.photos/200";

  return (
    <div className="awaited-gig">
      <div className="flex flex-col gap-20">
        <div>
          <h1 className="mb-14">{title}</h1>

          <Slider
            itemClass="mr-10 rounded-lg overflow-hidden"
            containerClass="max-w-3xl rounded-md mb-10"
            responsive={responsive}>
            {gigImages.map((image) => {
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
          currentUserId={currentUser?.id}
          gigUserId={gigUserId}
          sellerName={username}
          aboutSeller={`My name is ${username}, I enjoy creating AI generated art in my spare time. I have a lot of experience using the AI program and that means I know what to prompt the AI with to get a great and incredibly detailed result.`}
          fromCountry={country}
          languages="English"
          lastDelivery="1 day"
          memberDate="Aug 2022"
          rating={starNumber}
          responseTime="4 hours"
          sellerImage={image || fallbackImage}
        />

        <Reviews gigUserId={gigUserId} reviews={reviews} />
      </div>

      <GigCTA
        currentUserId={currentUser.id}
        isSeller={currentUser.isSeller}
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
  const { gigsDataPromise } = useLoaderData();

  return (
    <section className="gig-section min-h-[37.5rem] section-container relative text-neutral-700">
      <Breadcrumb className="mb-20">FIVERR &gt; GRAPHICS & DESIGN &gt;</Breadcrumb>

      <Suspense fallback={<Spinner />}>
        <Await
          resolve={gigsDataPromise}
          errorElement={<AsyncError errorMessage="Failed to load the gig!" />}>
          <AwaitedGig />
        </Await>
      </Suspense>
    </section>
  );
};

export default Gig;
