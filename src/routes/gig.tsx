import {
  AboutSeller,
  Slider,
  Reviews,
  GigCTA,
  LayoutSection,
  Heading1,
  Heading2
} from "../components";

import { useUser, usePageData } from "../hooks/";
import { capitalize } from "../utils";

import { responsiveConfig } from "../data/client/ts/ui";

const Gig = () => {
  const gigData = usePageData({ dataType: "gig" })?.gig;
  const user = useUser();

  const gig = gigData?.data;
  const reviews = gigData?.reviews;

  if (!gig) {
    return (
      <p className="text-zinc-500 text-lg font-medium text-center mt-10">
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
  let userName: string | null | undefined = null;
  let country: string | null = null;

  if (typeof userInfo !== "string") {
    gigUserId = userInfo._id;
    userImage = userInfo?.image;
    userName = userInfo.username;
    country = userInfo.country;
  }

  const fallbackImage = "https://picsum.photos/200";

  return (
    <LayoutSection className="relative">
      <div className="block grid-cols-none gap-0 xl:grid xl:grid-cols-2fr-1fr xl:gap-14">
        <div className="flex flex-col gap-20">
          <div>
            <Heading1 className="capitalize mb-14">{title}</Heading1>

            {!!images && (
              <Slider
                itemClass="mr-10 rounded-lg overflow-hidden"
                containerClass="max-w-3xl rounded-md mb-10"
                responsive={responsiveConfig}>
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
            )}

            <div>
              <Heading2 className="mb-4">About This Gig</Heading2>
              <p>{description}</p>
            </div>
          </div>

          <AboutSeller
            currentUserId={user?._id}
            gigUserId={gigUserId}
            sellerName={userName}
            aboutSeller={`My name is ${capitalize(
              userName 
            )}, I enjoy creating AI generated art in my spare time. I have a lot of experience using the AI program and that means I know what to prompt the AI with to get a great and incredibly detailed result.`}
            country={country}
            languages="English"
            lastDelivery="1 day"
            memberDate="Aug 2022"
            rating={totalStars}
            responseTime="4 hours"
            sellerImage={userImage || fallbackImage}
          />
          <Reviews gigUserId={gigUserId} reviews={reviews} gigStars={totalStars} />
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
    </LayoutSection>
  );
};

export default Gig;
