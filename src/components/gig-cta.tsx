import { Link, useParams } from "react-router-dom";
import { FaCheck, FaRecycle, FaRegClock } from "react-icons/fa";

import Button from "./button";
import Heading3 from "./typography/heading-3";
import CustomIcon from "./custom-icon";

import { cn, capitalizeFirstLetter } from "../utils";

type TProps = {
  currentUserId?: string;
  isSeller?: boolean;
  className?: string;
  gigUserId: string | null;
  price: number;
  priceText: string;
  description: string;
  deliveryDays: number;
  revisionsNumber: number;
  services: string[];
};

const GigCTA = ({
  currentUserId,
  isSeller,
  className,
  gigUserId,
  price,
  priceText,
  description,
  deliveryDays,
  revisionsNumber,
  services
}: TProps) => {
  const params = useParams();

  return (
    <div
      className={cn(
        "text-zinc-700 flex flex-col gap-5 max-w-xl rounded-md lg:sticky lg:top-[20.8rem] self-start border border-zinc-300 py-8 px-10 mt-20 2xl:mt-10",
        className
      )}>
      <div>
        <div className="mb-8">
          <Heading3 className="capitalize mb-2">{priceText}</Heading3>
          <span className="font-semibold text-xl text-zinc-600">${price}</span>
        </div>
        <p>{capitalizeFirstLetter(description)}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <CustomIcon Icon={FaRegClock} aria-label="A clock icon" />
          <span>{deliveryDays} Days Delivery</span>
        </div>

        <div className="flex items-center gap-3">
          <CustomIcon Icon={FaRecycle} aria-label="A recycle icon" />
          <span>{revisionsNumber} Revisions</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((service) => {
          return (
            <div key={service} className="item flex items-center gap-3">
              <CustomIcon Icon={FaCheck} color="#16a34a" aria-label="A check icon" />
              <span>{service}</span>
            </div>
          );
        })}

        {currentUserId !== gigUserId && !isSeller ? (
          <Link
            to={`/payment/${params.id}`}
            className="btn btn-primary block w-full tracking-wide mt-2">
            <Button className="block w-full tracking-wide" variant="primary">
              Pay
            </Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default GigCTA;
