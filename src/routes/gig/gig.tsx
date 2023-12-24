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
  AsyncError,
  LayoutSection
} from "../../components";

// import { ExternalUserSchema } from "../../constants/user-validator";
import { ExternalGigSchema, FromApiGigSchema } from "../../constants/gig-validator";
import { FromApiReviewsSchema } from "../../constants/review-validator";

import type { TAxiosResponses } from "../../types/api";
import type { TExternalGigPromise, TFromApiGig, TGig } from "../../types/gig";
import type { TFromApiReviews, TReview } from "../../types/review";

// import { responsiveConfig } from "../../data/client/ts/ui";
import "./gig.css";
import { handleError } from "../../utils/handle-error";

const AwaitedGig = () => {
  // Todo: Validate contextData
  const contextData = useOutletContext();

  const data = useAsyncValue() as TAxiosResponses<TFromApiGig, TFromApiReviews>;

  // const userValidationResult = ExternalUserSchema.safeParse(contextData);

  // if (userValidationResult.success) {
  //   console.log(userValidationResult.data);
  // }

  let validGig: TGig | null = null;
  let validReview: TReview | null = null;

  const [gigResponse, reviewsResponse] = data;

  const validationGigResult = FromApiGigSchema.safeParse(gigResponse.data);
  const validationReviewResult = FromApiReviewsSchema.safeParse(
    reviewsResponse.data
  );

  if (validationGigResult.success) {
    console.log(validationGigResult.data);
  } else {
    handleError(validationGigResult.error.issues);
  }

  if (validationReviewResult.success) {
    console.log(validationReviewResult.data);
  } else {
    handleError(validationReviewResult.error.issues);
  }

  // const reviews = reviewsResponse.data;

  // const {
  //   title,
  //   description,
  //   starNumber,
  //   images,
  //   userId: userInfo,
  //   features: services,
  //   deliveryTime: deliveryDays,
  //   price,
  //   revisionNumber,
  //   shortTitle,
  //   shortDescription
  // } = gig;

  // const { _id: gigUserId, image, username, country } = userInfo;

  // const fallbackImage = "https://picsum.photos/200";

  // return (
  //   <div className="awaited-gig">
  //     <div className="flex flex-col gap-20">
  //       <div>
  //         <h1 className="mb-14">{title}</h1>

  //         {/* <Slider
  //           itemClass="mr-10 rounded-lg overflow-hidden"
  //           containerClass="max-w-3xl rounded-md mb-10"
  //           responsive={responsive}>
  //           {images.map((image) => {
  //             return (
  //               <img
  //                 className="w-full h-full object-cover"
  //                 key={image}
  //                 src={image}
  //                 alt=""
  //               />
  //             );
  //           })}
  //         </Slider> */}

  //         <div>
  //           <h2 className="mb-4">About This Gig</h2>
  //           <p>{description}</p>
  //         </div>
  //       </div>

  //       {/* <AboutSeller
  //         currentUserId={currentUser?.id}
  //         gigUserId={gigUserId}
  //         sellerName={username}
  //         aboutSeller={`My name is ${username}, I enjoy creating AI generated art in my spare time. I have a lot of experience using the AI program and that means I know what to prompt the AI with to get a great and incredibly detailed result.`}
  //         fromCountry={country}
  //         languages="English"
  //         lastDelivery="1 day"
  //         memberDate="Aug 2022"
  //         rating={starNumber}
  //         responseTime="4 hours"
  //         sellerImage={image || fallbackImage}
  //       /> */}

  //       <Reviews gigUserId={gigUserId} reviews={reviews} />
  //     </div>

  //     {/* <GigCTA
  //       currentUserId={currentUser?.id}
  //       isSeller={currentUser?.isSeller}
  //       gigUserId={gigUserId}
  //       deliveryDays={deliveryDays}
  //       description={shortDescription}
  //       price={price}
  //       priceText={shortTitle}
  //       revisionsNumber={revisionNumber}
  //       services={services}
  //     /> */}
  //   </div>
  // );

  return null;
};

const Gig = () => {
  const data = useLoaderData();

  let validGigPromise: null | TExternalGigPromise = null;

  const validatedGigPromise = ExternalGigSchema.safeParse(data);

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
