import { Suspense } from "react";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useOutletContext
} from "react-router-dom";

import {
  AboutSeller,
  Slider,
  Reviews,
  GigCTA,
  Spinner,
  AsyncError
} from "../../components";

import { responsiveConfig } from "../../data/client/ts/ui";

import "./gig.css";

const AwaitedGig = () => {
  const { currentUser } = useOutletContext();
  const [gigResponse, reviewsResponse] = useAsyncValue();

  const gig = gigResponse.data;
  const reviews = reviewsResponse.data;

  const {
    title,
    description,
    starNumber,
    images,
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
        currentUserId={currentUser?.id}
        isSeller={currentUser?.isSeller}
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
