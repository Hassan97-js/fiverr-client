import Button from "./button";
import Stars from "./stars";

import Heading2 from "./typography/heading-2";

type TProps = {
  rating: number;
  currentUserId?: string;
  gigUserId: string | null;
  sellerName: string | null;
  sellerImage: string;
  country: string | null;
  memberDate: string;
  responseTime: string;
  lastDelivery: string;
  languages: string;
  aboutSeller: string;
};

const AboutSeller = ({
  currentUserId,
  gigUserId,
  sellerName,
  sellerImage,
  country,
  memberDate,
  responseTime,
  lastDelivery,
  languages,
  aboutSeller,
  rating
}: TProps) => {
  return (
    <div className="text-zinc-700">
      <div>
        <Heading2 className="mb-6">About The Seller</Heading2>

        <div className="user">
          <div className="flex items-center gap-4">
            <img
              className="self-start w-12 h-12 object-cover object-postion-center rounded-full"
              src={sellerImage}
              alt=""
            />

            <div className="info flex flex-col gap-1">
              {sellerName && <span className="font-medium mt-1 capitalize">{sellerName}</span>}
              <div className="stars">
                <Stars className="mt-1" numberOfStars={rating} />
              </div>
            </div>
          </div>
          {currentUserId !== gigUserId ? (
            <Button variant="secondary" className="mt-6 tracking-wide">
              Contact me
            </Button>
          ) : null}
        </div>
      </div>

      <div className="box border border-zinc-200 w-full max-w-lg rounded-sm mt-10">
        <div className="grid md:grid-cols-2 gap-3 p-4">
          <div>
            <p>From</p>
            <p className="font-medium capitalize">{country} </p>
          </div>

          <div>
            <p>Member since</p>
            <p className="font-medium">{memberDate} </p>
          </div>

          <div>
            <p>Avg. response time</p>
            <p className="font-medium">{responseTime} </p>
          </div>

          <div>
            <p>Last delivery</p>
            <p className="font-medium">{lastDelivery} </p>
          </div>

          <div>
            <p>Languages</p>
            <p className="font-medium">{languages} </p>
          </div>
        </div>

        <hr />

        <p className="p-4">{aboutSeller}</p>
      </div>
    </div>
  );
};

export default AboutSeller;
