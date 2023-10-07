import { Link, useParams } from "react-router-dom";
import { FaCheck, FaRecycle, FaRegClock } from "react-icons/fa";

import CustomIcon from "./custom-icon";

const GigCTA = ({
  currentUserId,
  containerClassName = "",
  gigUserId,
  price,
  priceText,
  description,
  deliveryDays,
  revisionsNumber,
  services
}) => {
  const params = useParams();

  return (
    <div
      className={`text-neutral-700 flex flex-col gap-5 max-w-xl rounded-md lg:sticky lg:top-[20.8rem] self-start border border-neutral-300 py-8 px-10 mt-20 2xl:mt-10 ${containerClassName}`}>
      <div>
        <div className="mb-3">
          <h4 className="mb-2">{priceText}</h4>
          <span className="font-medium text-lg">${price}</span>
        </div>
        <p>{description}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <CustomIcon icon={FaRegClock} aria-label="A clock icon" />
          <span>{deliveryDays} Days Delivery</span>
        </div>

        <div className="flex items-center gap-3">
          <CustomIcon icon={FaRecycle} aria-label="A recycle icon" />
          <span>{revisionsNumber} Revisions</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {services.map((service) => {
          return (
            <div key={service} className="item flex items-center gap-3">
              <CustomIcon icon={FaCheck} color="#16a34a" aria-label="A check icon" />
              <span>{service}</span>
            </div>
          );
        })}

        {currentUserId !== gigUserId ? (
          <Link
            to={`/payment/${params.id}`}
            className="btn btn-primary block w-full mt-5 tracking-wide">
            Continue
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default GigCTA;
