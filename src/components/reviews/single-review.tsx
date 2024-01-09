import { RiThumbUpLine, RiThumbDownLine } from "react-icons/ri";

import Stars from "../stars";
import Button from "../button";
import CustomIcon from "../custom-icon";

type TProps = {
  sellerName: string;
  sellerImage?: string;
  countryName?: string;
  description: string;
  gigStars: number;
};

const Review = ({
  sellerName,
  sellerImage,
  countryName,
  description,
  gigStars
}: TProps) => {
  const fallbackImage = "https://picsum.photos/200";

  return (
    <div className="flex flex-wrap flex-col gap-10 flex-1 rounded-sm shadow-md px-8 py-6 max-w-[500px]">
      <div className="flex flex-col gap-5 flex-1 w-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img
              className="w-8 h-8 object-cover object-center rounded-full"
              src={sellerImage || fallbackImage}
              alt=""
            />

            <div className="flex flex-col">
              <p className="font-medium capitalize text-sm">{sellerName}</p>
              <p className="capitalize text-zinc-500 font-normal text-sm">
                {countryName || "Earth"}
              </p>
            </div>
          </div>

          <Stars numberOfStars={gigStars} className="self-start" />
        </div>

        <p className="max-w-[45ch] text-zinc-800">
          <span className="capitalize">{description[0]}</span>
          <span>{description.slice(1)}</span>
        </p>
      </div>

      <div className="flex items-center gap-4 font-medium mt-auto text-zinc-600">
        <span>Helpful?</span>

        <div className="flex gap-3">
          <Button type="submit" className="gap-[6px] p-0 text-green-600">
            <CustomIcon Icon={RiThumbUpLine} aria-label="A thumb up icon" />
            <span className="sr-only">Yes</span>
          </Button>

          <Button type="submit" className="gap-[6px] p-0 text-red-500">
            <CustomIcon Icon={RiThumbDownLine} aria-label="A thumb down icon" />
            <span className="sr-only">No</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Review;
