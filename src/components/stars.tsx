import { type HTMLAttributes } from "react";
import { RiStarFill } from "react-icons/ri";

import CustomIcon from "./custom-icon";
import { cn } from "../utils";

type TProps = HTMLAttributes<HTMLDivElement> & {
  numberOfStars?: number;
  iconSize?: string;
};

const Stars = ({ numberOfStars = 0, className, iconSize = "1em" }: TProps) => {
  if (!numberOfStars || numberOfStars === 0 || numberOfStars > 5 || numberOfStars < 0) {
    return null;
  }

  const floored = Math.floor(numberOfStars);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array(floored)
        .fill(0)
        .map((_item, i) => {
          return (
            <CustomIcon
              key={i}
              Icon={RiStarFill}
              className="text-yellow-400"
              size={iconSize}
              aria-label="A star icon"
            />
          );
        })}
    </div>
  );
};

export default Stars;
