import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";

import Stars from "../stars";
import Button from "../button";
import CustomIcon from "../custom-icon";

const Review = ({
  sellerName,
  sellerImage,
  countryName,
  countryImage,
  description
}) => {
  const fallbackImage = "https://picsum.photos/200";

  return (
    <div className="flex flex-wrap flex-col gap-3 flex-1 rounded-sm shadow-md px-8 py-6 sm:min-w-[400px] sm:min-h-[23.75rem]">
      <div className="flex gap-3">
        <img
          className="w-8 h-8 object-cover object-center rounded-full"
          src={sellerImage || fallbackImage}
          alt=""
        />

        <div>
          <span className="font-medium">{sellerName}</span>
          <div className="flex gap-2 items-center">
            <img
              className="w-4 h-4"
              src={countryImage}
              alt={`${countryName} flag`}
            />
            <span>{countryName}</span>
          </div>
        </div>
      </div>

      <Stars>5</Stars>

      <p className="max-w-[45ch]">{description}</p>

      <form className="font-medium flex items-center gap-3 mt-auto">
        <span>Helpful?</span>

        <Button type="submit" className="gap-2">
          <CustomIcon Icon={RiThumbUpLine} aria-label="A thumb up icon" />
          <span>Yes</span>
        </Button>

        <Button type="submit" className="gap-2">
          <CustomIcon Icon={RiThumbDownLine} aria-label="A thumb down icon" />
          <span>No</span>
        </Button>
      </form>
    </div>
  );
};

export default Review;
