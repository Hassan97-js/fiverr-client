import { Link } from "react-router-dom";
import { RiHeartFill } from "react-icons/ri";

import CustomIcon from "./custom-icon";
import Stars from "./stars";

import { capitalize, formatCurrency, getRatingAverage } from "../utils";

const GigCard = ({
  userInfo,
  gigId,
  coverImage,
  category,
  price,
  description,
  totalStars,
  starNumber
}) => {
  const styles = {
    backgroundImage: `url(${coverImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "top"
  };

  const { username, image } = userInfo;

  const formattedPrice = formatCurrency(price);
  const gigRating = getRatingAverage(totalStars, starNumber);

  const fallbackImage = "https://picsum.photos/200";

  return (
    <Link
      to={`/gig/${gigId}`}
      className="flex flex-col max-w-sm min-h-[450px] max-h-max shadow-md rounded-sm overflow-hidden">
      <div style={styles} className="h-48" role="image"></div>

      <div className="flex flex-col px-4 mt-5 flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-5">
            <img
              className="object-cover rounded-full w-8 h-8"
              src={image || fallbackImage}
              alt="a freelancing client image"
            />

            <strong className="font-semibold">
              <span>{capitalize(username)}</span>
              <p className="text-sm font-normal text-neutral-500">{category}</p>
            </strong>
          </div>
        </div>

        <p className="mb-5 truncate">{description}</p>

        <Stars starNumber={gigRating} />

        <div className="flex items-center justify-between pb-4 pt-4 mt-auto border-0 border-t-[0.5px] border-t-neutral-200">
          <CustomIcon
            icon={RiHeartFill}
            colorOverride={true}
            className="text-red-500"
            size="1.2em"
            aria-label="A heart icon"
          />

          <div className="flex flex-col items-end">
            <p className="uppercase text-neutral-500 text-sm font-medium">
              Starting at
            </p>
            <strong className="text-lg font-semibold">{formattedPrice}</strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
